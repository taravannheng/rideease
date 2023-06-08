import { FC } from "react";
import { motion } from "framer-motion";

import ImgLogoDark from "../../assets/logos/logo-dark.png";

const ProgressIndicator: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-16">
      <img src={ImgLogoDark} alt="site logo" className="h-12" />
      <div className="progress-track h-[8px] w-[200px] overflow-hidden bg-neutral-grey-1 p-[2px]">
        <motion.div
          className="active-indicator h-[4px] w-[40px] bg-primary"
          initial={{ x: -10 }}
          animate={{ x: [-10, 170, -10] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
