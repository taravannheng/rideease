import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";

import Header from "../../components/header/index.component";
import CartItem from "../../components/cart-item/index.component";
import Button from "../../components/button/index.component";
import Footer from "../../components/footer/index.component";
import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";
import CartItemModel from "../../models/cart-item";
import ProgressIndicator from "../../components/progress-indicator/index.component";

// Stripe
let stripePromise: Promise<Stripe | null>;
const getStripePromise = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
    );
  }

  return stripePromise;
};

const CartPage: FC = () => {
  let initialCartTotal = 0;
  const navigate = useNavigate();
  const lsCartState = localStorage.getItem("ls-cart-state");
  const [loading, setLoading] = useState(true);

  // CONTEXTS
  const { cartState, setCartState } = useContext(CartContext);

  // STRIPE
  let itemsToCheckout: { price: string; quantity: number }[] = [];
  cartState.map((item: CartItemModel) => {
    return itemsToCheckout.push({ price: item.details.stripeID, quantity: 1 });
  });
  const checkoutOptions: any = {
    lineItems: itemsToCheckout,
    mode: "payment",
    successUrl: `${window.location.origin}/payment-success`,
    cancelUrl: `${window.location.origin}/cart`,
  };

  // END STRIPE

  const removeItemHandler = (e: Event) => {
    const el = e.target as HTMLButtonElement;
    const elID = el.id;
    const filteredCart = cartState.filter(
      (item: CartItemModel) => item.id !== elID
    );

    setCartState(filteredCart);

    localStorage.setItem("ls-cart-state", JSON.stringify(filteredCart));
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripePromise();
    localStorage.setItem("ls-redirected-to-checkout", JSON.stringify(true));
    await stripe?.redirectToCheckout(checkoutOptions);
  };

  useEffect(() => {
    if (_.isEmpty(cartState) && _.isEmpty(JSON.parse(lsCartState!))) {
      navigate(ROUTES.BOOKING);
    }
  }, [cartState]);

  useEffect(() => {
    if (lsCartState) {
      setCartState(JSON.parse(lsCartState));
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <ProgressIndicator />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex min-h-screen flex-col"
          >
            <Header type="cart" />
            <main className="cart mb-24 pt-12">
              <div className="ml-6 mb-4 w-32 min-w-[8rem] max-w-lg md:ml-12">
                <Button
                  buttonStyle="go-back"
                  iconSource={faChevronLeft}
                  route={ROUTES.BOOKING}
                  type="button"
                  className="w-32 min-w-[8rem] max-w-lg !justify-start !p-0"
                >
                  Booking
                </Button>
              </div>

              <h1 className="cart__title pl-6 text-h3 text-neutral-dark md:pl-12 md:text-h2">
                Cart
              </h1>
              <ul className="cart__title-list mt-12 flex flex-row items-center justify-between gap-x-2 px-6 md:px-12">
                <li className="flex basis-1/3 justify-center bg-neutral-grey-1 py-2 text-body text-neutral-grey-4">
                  Product
                </li>
                <li className="flex basis-1/3 justify-center bg-neutral-grey-1 py-2 text-body text-neutral-grey-4">
                  Price Per Day
                </li>
                <li className="flex basis-1/3 justify-center bg-neutral-grey-1 py-2 text-body text-neutral-grey-4">
                  Action
                </li>
              </ul>
              <ul className="cart__item mt-12 flex flex-col items-center justify-between gap-x-2 px-6 md:px-12">
                {cartState.map((item: CartItemModel) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    className="mb-8"
                    onClick={removeItemHandler}
                  />
                ))}
              </ul>
              <div className="mt-4 flex flex-row justify-end px-6 md:px-12">
                <p className="relative flex basis-1/3 justify-center">
                  <span className="absolute left-0">Total:</span>
                  <span>
                    $
                    {cartState.reduce(
                      (accumulator: number, currentItem: CartItemModel) =>
                        accumulator + currentItem.details.pricePerDay,
                      initialCartTotal
                    )}
                  </span>
                </p>
              </div>
              <div className="mt-12 flex flex-row justify-between gap-x-4 px-6 md:px-12">
                <div></div>
                <div></div>
                <div className="flex basis-1/3 justify-center">
                  <Button
                    buttonStyle="primary"
                    onClick={redirectToCheckout}
                    type="button"
                    className="w-32 min-w-[8rem] max-w-lg"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </main>
            <Footer className="mt-auto" />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default CartPage;
