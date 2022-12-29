import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import CartContext from "../../contexts/cart-context";

const Cart: FC = () => {
  const {cartState} = useContext(CartContext);

  return (
    <div className="cart h-12 bg-primary hover:bg-primary-dark transition border-none text-neutral-light text-body flex items-center justify-between px-6 gap-x-4 cursor-pointer">
      <FontAwesomeIcon icon={faCartShopping} className="w-[24px] h-[24px]" />
      <div className="cart__count-container w-6 h-6 bg-neutral-light flex items-center justify-center rounded-full">
        <span className="cart__count text-neutral-dark text-body">{cartState.length}</span>
      </div>
    </div>
  );
};

export default Cart;
