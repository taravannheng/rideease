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
          <motion.div exit={{ opacity: 0 }} >
            <ProgressIndicator />
          </motion.div>
        )}
      </AnimatePresence>
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen"
        >
          <Header type="auth" />
          <main className="not-found mt-8 sm:20">
            <div className="flex flex-row justify-center items-center gap-x-4">
              <span className=" text-[96px] sm:text-[128px] font-bold text-primary">
                4
              </span>
              <img
                src={ImgTire}
                alt="car tire"
                className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
                onLoad={() => setLoading(false)}
              />
              <span className="text-[96px] sm:text-[128px] font-bold text-primary">
                4
              </span>
            </div>
            <p className="text-center text-h3">Page Not Found</p>
            <div className="flex justify-center">
              <Button
                buttonStyle="primary"
                type="button"
                route={ROUTES.HOME}
                className="mt-12 min-w-[8rem] w-32 max-w-lg"
              >
                Back to Home
              </Button>
            </div>
          </main>
          <Footer className="mt-20 md:w-full md:absolute md:bottom-0 md:right-0" />
        </motion.div>
    </>
  );
};

export default NotFoundPage;
