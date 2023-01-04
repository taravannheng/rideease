import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/header/index.component";
import Button from "../../components/button/index.component";
import Footer from "../../components/footer/index.component";
import * as ROUTES from "../../utils/constants/routes";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const PaymentSuccessPage: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // remove local storage
    localStorage.removeItem("ls-redirected-to-checkout");
    localStorage.removeItem("ls-cart-state");

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
          >
            <div className="relative min-h-screen">
              <Header type="cart" />
              <main className="not-found sm:20 mt-8 flex flex-col items-center pt-16">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="mb-8 h-16 w-16 text-primary"
                />
                <h1 className="mb-16 text-center text-h2 text-neutral-dark">
                  Payment Success!
                </h1>
                <Button buttonStyle="primary" type="button" route={ROUTES.HOME}>
                  Back to Home
                </Button>
              </main>
              <Footer className="mt-20 md:absolute md:bottom-0 md:right-0 md:w-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default PaymentSuccessPage;
