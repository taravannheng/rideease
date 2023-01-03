import { FC, useContext, useEffect, useState } from "react";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/header/index.component";
import Carousel from "../../components/carousel/index.component";
import Footer from "../../components/footer/index.component";
import ProductContext from "../../contexts/product-context";
import CartItemModel from "../../models/cart-item";
import ProgressIndicator from "../../components/progress-indicator/index.component";

const BookingPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const { productState, setProductState } = useContext(ProductContext);

  // fetch products from firestore
  useEffect(() => {
    const lsProductState = localStorage.getItem("ls-product-state");

    const fetchProducts = async () => {
      if (!lsProductState) {
        const db = getFirestore();
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        let products: CartItemModel[] = [];

        querySnapshot.forEach((product: any) => {
          return products.push(product.data());
        });

        setProductState(products);
        localStorage.setItem("ls-product-state", JSON.stringify(products));

        return;
      }

      setProductState(JSON.parse(lsProductState));
    };

    fetchProducts();

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
            className="min-h-screen flex flex-col"
          >
            <Header type="cart" />
            <main className="booking mb-24">
              <Carousel items={productState} />
            </main>
            <Footer className="mt-auto" />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default BookingPage;
