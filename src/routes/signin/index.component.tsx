import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/header/index.component";
import AuthForm from "../../components/forms/auth/index.component";
import Footer from "../../components/footer/index.component";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const SignInPage: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            <Header type="auth" />
            <AuthForm type="sign in" />
            <Footer className="mt-20 lg:mt-0" />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default SignInPage;
