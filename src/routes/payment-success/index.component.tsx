import { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/header/index.component";
import Button from "../../components/button/index.component";
import Footer from "../../components/footer/index.component";
import * as ROUTES from "../../utils/constants/routes";

const PaymentSuccessPage: FC = () => {
  useEffect(() => {
    // remove local storage
    localStorage.removeItem('ls-redirected-to-checkout');
    localStorage.removeItem('ls-cart-state');
  }, []);

  return (
    <div className="relative min-h-screen">
      <Header type="cart" />
      <main className="not-found mt-8 sm:20 flex flex-col items-center pt-16">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-primary w-16 h-16 mb-8"
        />
        <h1 className="text-neutral-dark text-h2 text-center mb-16">
          Payment Success!
        </h1>
        <Button buttonStyle="primary" type="button" route={ROUTES.HOME}>
          Back to Home
        </Button>
      </main>
      <Footer className="mt-20 md:w-full md:absolute md:bottom-0 md:right-0" />
    </div>
  );
};

export default PaymentSuccessPage;
