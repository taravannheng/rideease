import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import Header from "../../components/header/index.component";
import CartItem from "../../components/cart-item/index.component";
import Button from "../../components/button/index.component";
import Footer from "../../components/footer/index.component";
import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";
import CartItemModel from "../../models/cart-item";

// Stripe
let stripePromise: Promise<Stripe | null>;
const getStripePromise = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
  }

  return stripePromise;
}

const CartPage: FC = () => {
  let initialCartTotal = 0;
  const navigate = useNavigate();
  const lsCartState = localStorage.getItem('ls-cart-state')

  // CONTEXTS
  const { cartState, setCartState } = useContext(CartContext);

  // STRIPE
  let itemsToCheckout: {price: string, quantity: number}[] = [];
  cartState.map((item: CartItemModel) => {
    return itemsToCheckout.push({price: item.details.stripeID, quantity: 1});
  });
  const checkoutOptions: any = { lineItems: itemsToCheckout, mode: 'payment', successUrl: `${window.location.origin}/payment-success`, cancelUrl: `${window.location.origin}/cart` }

  // END STRIPE

  const removeItemHandler = (e: Event) => {
    const el = e.target as HTMLButtonElement;
    const elID = el.id;
    const filteredCart = cartState.filter((item: CartItemModel) => item.id !== elID);

    setCartState(filteredCart);

    localStorage.setItem('ls-cart-state', JSON.stringify(filteredCart))
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripePromise();
    await stripe?.redirectToCheckout(checkoutOptions)
  }

  useEffect(() => {
    if (cartState.length === 0 && JSON.parse(lsCartState!).length === 0) {
      navigate(ROUTES.BOOKING);
    }
  }, [cartState]);

  useEffect(() => {
    if (lsCartState) {
      setCartState(JSON.parse(lsCartState));
    }
  }, []);

  return (
    <>
      <Header type="cart" />
      <main className="cart pt-12">
        <div className="min-w-[8rem] w-32 max-w-lg ml-6 md:ml-12 mb-4">
          <Button
            buttonStyle="go-back"
            iconSource={faChevronLeft}
            route={ROUTES.BOOKING}
            type="button"
            className="min-w-[8rem] w-32 max-w-lg !justify-start !p-0"
          >
            Booking
          </Button>
        </div>

        <h1 className="cart__title text-neutral-dark text-h3 md:text-h2 pl-6 md:pl-12">
          Cart
        </h1>
        <ul className="cart__title-list px-6 md:px-12 flex flex-row items-center justify-between mt-12 gap-x-2">
          <li className="text-neutral-grey-4 text-body basis-1/3 flex justify-center bg-neutral-grey-1 py-2">
            Product
          </li>
          <li className="text-neutral-grey-4 text-body basis-1/3 flex justify-center bg-neutral-grey-1 py-2">
            Price Per Day
          </li>
          <li className="text-neutral-grey-4 text-body basis-1/3 flex justify-center bg-neutral-grey-1 py-2">
            Action
          </li>
        </ul>
        <ul className="cart__item px-6 md:px-12 flex flex-col items-center justify-between mt-12 gap-x-2">
          {cartState.map((item: CartItemModel) => (
            <CartItem
              key={item.id}
              item={item}
              className="mb-8"
              onClick={removeItemHandler}
            />
          ))}
        </ul>
        <div className="flex flex-row justify-end px-6 md:px-12 mt-4">
          <p className="basis-1/3 flex justify-center relative">
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
        <div className="flex flex-row gap-x-4 justify-between px-6 md:px-12 mt-12">
          <div></div>
          <div></div>
          <div className="basis-1/3 flex justify-center">
            <Button
              buttonStyle="primary"
              onClick={redirectToCheckout}
              type="button"
              className="min-w-[8rem] w-32 max-w-lg"
            >
              Checkout
            </Button>
          </div>
        </div>
      </main>
      <Footer className="mt-20" />
    </>
  );
};

export default CartPage;
