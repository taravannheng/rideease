import { FC } from "react";
import { motion } from "framer-motion";

import ImgLogoDark from "../../assets/logos/logo-dark.png";

const ProgressIndicator: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-y-16 justify-center items-center">
      <img src={ImgLogoDark} alt="site logo" className="h-16" />
      <div className="progress-track w-[200px] h-[8px] bg-neutral-grey-1 p-[2px]">
        <motion.div
          className="active-indicator w-[40px] h-[4px] bg-primary"
          initial={{ translateX: 0 }}
          animate={{ translateX: [0, 160, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressIndicator;