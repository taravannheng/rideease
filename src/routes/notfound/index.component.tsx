import { FC } from "react";

import Header from "../../components/header/index.component";
import Button from "../../components/button/index.component";
import * as ROUTES from "../../utils/constants/routes";
import Footer from "../../components/footer/index.component";
import ImgTire from "../../assets/images/tire.png";

const NotFoundPage: FC = () => {
  return (
    <div className="relative min-h-screen">
      <Header type="landing" />
      <main className="not-found mt-8 sm:20">
        <div className="flex flex-row justify-center items-center gap-x-4">
          <span className=" text-[96px] sm:text-[128px] font-bold text-primary">4</span>
          <img src={ImgTire} alt="car tire" className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]" />
          <span className="text-[96px] sm:text-[128px] font-bold text-primary">4</span>
        </div>
        <p className="text-center text-h3">Page Not Found</p>
        <div className="flex justify-center">
          <Button buttonStyle="primary" type="button" route={ROUTES.HOME} className="mt-12 min-w-[8rem] w-32 max-w-lg">
            Back to Home
          </Button>
        </div>
      </main>
      <Footer className="mt-20 md:w-full md:absolute md:bottom-0 md:right-0" />
    </div>
  );
};

export default NotFoundPage;
