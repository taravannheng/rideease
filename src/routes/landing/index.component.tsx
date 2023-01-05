import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../utils/constants/routes";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";

import Header from "../../components/header/index.component";
import ImgCarLamborghini from "../../assets/images/car-lamborghini.png";
import ImgStripeLogo from "../../assets/logos/sripe.svg";
import Button from "../../components/button/index.component";
import Carousel from "../../components/carousel/index.component";
import Footer from "../../components/footer/index.component";
import ProductContext from "../../contexts/product-context";
import UserContext from "../../contexts/user-context";
import CartItemModel from "../../models/cart-item";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const LandingPage: FC = () => {
  const { productState, setProductState } = useContext(ProductContext);
  const { userState, setUserState } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch products from firestore
    const fetchProducts = async () => {
      // get products from local storage
      const lsProductState = localStorage.getItem("ls-product-state");

      if (!lsProductState) {
        const db = getFirestore();
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        let products: CartItemModel[] = [];

        querySnapshot.forEach((product: any) => {
          return products.push(product.data());
        });

        setProductState(products);

        // set data to local storage
        localStorage.setItem("ls-product-state", JSON.stringify(products));

        return;
      }

      setProductState(JSON.parse(lsProductState));
    };

    fetchProducts();

    // update loading state
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // retrieve user state from local storage
    const lsUserState = localStorage.getItem("ls-user-state");
    if (!_.isEmpty(JSON.parse(lsUserState!))) {
      setUserState(lsUserState);
    }
  }, []);

  return (
    <>
      {loading ? (
        <ProgressIndicator />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ translateY: -50 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.5 }}
            >
              {userState ? <Header type="sign-out" /> : <Header type="auth" />}
            </motion.div>
            <main className="landing flex flex-col items-center pt-16 md:pt-24">
              <section className="landing__hero flex flex-col items-center">
                <img
                  src={ImgCarLamborghini}
                  alt="lamborghini"
                  className="m-auto h-40 md:h-80  xl:h-96"
                />
                <h1 className="text-center text-h3 text-primary md:text-h2 lg:text-h1">
                  Car Rental Made Easy
                </h1>
                <p className="m-auto w-10/12 text-center text-body text-neutral-grey-4 md:w-6/12 lg:w-1/3">
                  Easily rent a car with HERTZ UTS. Create an account with email
                  or Google Sign In then select from a wide variety of available
                  cars. Payments can be made easily and quickly with our Stripe
                  integration. Sign up now and start booking with our platform.
                </p>
                <div className="button-container mt-8 w-40">
                  <Link to={ROUTES.BOOKING}>
                    <Button type="button" buttonStyle="primary">
                      Start Booking
                    </Button>
                  </Link>
                </div>
              </section>
              <section className="landing__payment mt-20 flex w-full flex-row items-center justify-center bg-neutral-grey-1 py-10 md:mt-40">
                <div className="landing__payment-logo-container flex basis-1/2 justify-end">
                  <img
                    src={ImgStripeLogo}
                    alt="Stripe Logo"
                    className="h-32 lg:h-52"
                  />
                </div>
                <div className="landing__payment-text flex basis-1/2 flex-col pr-5">
                  <h2 className="text-left text-h4 text-neutral-dark sm:text-h3 lg:text-h2">
                    Quick Payments
                  </h2>
                  <p className="mt-2 text-left text-body text-neutral-grey-4 sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3">
                    Made your payments quickly and efficiently through Stripe
                    for all your bookings
                  </p>
                </div>
              </section>
              <section className="landing__car-preview mt-20 flex w-full flex-col items-center md:mt-40">
                <h2 className="text-h3 text-neutral-dark lg:text-h2">
                  Car Preview
                </h2>
                <p className="text-body text-neutral-grey-4">
                  Select from a wide variety of available cars
                </p>
                <Carousel
                  items={productState}
                  showDetails={false}
                  showBookButton={false}
                />
              </section>
            </main>
            <Footer className="mt-20 md:mt-40" />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default LandingPage;
