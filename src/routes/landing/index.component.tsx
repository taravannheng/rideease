import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../utils/constants/routes";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/header/index.component";
import ImgCarLamborghini from "../../assets/images/car-lamborghini.png";
import ImgStripeLogo from "../../assets/logos/sripe.svg";
import Button from "../../components/button/index.component";
import Carousel from "../../components/carousel/index.component";
import Footer from "../../components/footer/index.component";
import ProductContext from "../../contexts/product-context";
import CartItemModel from "../../models/cart-item";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const LandingPage: FC = () => {
  const { productState, setProductState } = useContext(ProductContext);
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

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <ProgressIndicator />
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <motion.div initial={{ translateY: -50 }} animate={{ translateY: 0 }} transition={{ duration: 0.5 }}>
              <Header type="auth" />
            </motion.div>
            <main className="landing pt-16 md:pt-24 flex flex-col items-center">
              <section className="landing__hero flex flex-col items-center">
                <img
                  src={ImgCarLamborghini}
                  alt="lamborghini"
                  className="h-40 md:h-80 xl:h-96  m-auto"
                />
                <h1 className="text-h3 md:text-h2 lg:text-h1 text-primary text-center">
                  Car Rental Made Easy
                </h1>
                <p className="text-center text-neutral-grey-4 text-body w-10/12 md:w-6/12 lg:w-1/3 m-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Curabitur tempus urna at
                  turpis condimentum
                </p>
                <div className="button-container w-40 mt-8">
                  <Link to={ROUTES.BOOKING}>
                    <Button type="button" buttonStyle="primary">
                      Start Booking
                    </Button>
                  </Link>
                </div>
              </section>
              <section className="landing__payment w-full flex flex-row justify-center items-center bg-neutral-grey-1 py-10 mt-20 md:mt-40">
                <div className="landing__payment-logo-container basis-1/2 flex justify-end">
                  <img
                    src={ImgStripeLogo}
                    alt="Stripe Logo"
                    className="h-32 lg:h-52"
                  />
                </div>
                <div className="landing__payment-text flex flex-col pr-5 basis-1/2">
                  <h2 className="text-h4 sm:text-h3 lg:text-h2 text-neutral-dark text-left">
                    Quick Payments
                  </h2>
                  <p className="text-body text-neutral-grey-4 text-left sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 mt-2">
                    Made your payments quickly and efficiently through Stripe
                    for all your bookings
                  </p>
                </div>
              </section>
              <section className="landing__car-preview flex flex-col items-center w-full mt-20 md:mt-40">
                <h2 className="text-h3 lg:text-h2 text-neutral-dark">
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
