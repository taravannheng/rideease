import { FC, useContext, useEffect } from "react";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";

import Header from "../../components/header/index.component";
import Carousel from "../../components/carousel/index.component";
import Footer from "../../components/footer/index.component";
import ProductContext from "../../contexts/product-context";
import CartItemModel from "../../models/cart-item";

const BookingPage: FC = () => {
  const { productState, setProductState } = useContext(ProductContext);

  // fetch products from firestore
  useEffect(() => {
    const lsProductState = localStorage.getItem('ls-product-state');

    const fetchProducts = async () => {
      if (!lsProductState) {
        const db = getFirestore()
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        let products: CartItemModel[] = [];

        querySnapshot.forEach((product: any) => {
          return products.push(product.data())
        });

        setProductState(products)
        localStorage.setItem('ls-product-state', JSON.stringify(products));

        return;
      }

      setProductState(JSON.parse(lsProductState));
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Header type="cart" />
      <main className="booking">
        <Carousel items={productState} />
      </main>
      <Footer className="mt-20" />
    </>
  );
};

export default BookingPage;
