import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/header/index.component";
import Button from "../../components/button/index.component";
import * as ROUTES from "../../utils/constants/routes";
import Footer from "../../components/footer/index.component";
import ImgTire from "../../assets/images/tire.png";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const NotFoundPage: FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }}>
            <ProgressIndicator />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex min-h-screen flex-col"
      >
        <Header type="auth" />
        <main className="not-found mt-12 mb-24 sm:mt-20">
          <div className="flex flex-row items-center justify-center gap-x-4">
            <span className="text-[64px] font-bold text-primary sm:text-[128px]">
              4
            </span>
            <img
              src={ImgTire}
              alt="car tire"
              className="h-[64px] w-[64px] sm:h-[120px] sm:w-[120px]"
              onLoad={() => setLoading(false)}
            />
            <span className="text-[64px] font-bold text-primary sm:text-[128px]">
              4
            </span>
          </div>
          <p className="text-center text-h4 sm:text-h3">Page Not Found</p>
          <div className="flex justify-center">
            <Button
              buttonStyle="primary"
              type="button"
              route={ROUTES.HOME}
              className="mt-12 w-24 min-w-[7rem] max-w-lg py-2 sm:w-32 sm:min-w-[8rem] sm:max-w-lg sm:py-3"
            >
              Back to Home
            </Button>
          </div>
        </main>
        <Footer className="mt-auto w-full" />
      </motion.div>
    </>
  );
};

export default NotFoundPage;
