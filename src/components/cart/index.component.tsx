import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";

const Cart: FC = () => {
  const { cartState } = useContext(CartContext);
  const location = useLocation();

  return (
    <Link to={cartState.length > 0 ? ROUTES.CART : location.pathname}>
      <div className="cart h-8 sm:h-12 bg-primary hover:bg-primary-dark transition border-none text-neutral-light text-body flex items-center justify-between px-4 sm:px-6 gap-x-2 sm:gap-x-4 cursor-pointer">
        <FontAwesomeIcon icon={faCartShopping} className="w-[16px] sm:w-[24px] h-[16px] sm:h-[24px]" />
        <div className="cart__count-container w-4 h-4 sm:w-6 sm:h-6 bg-neutral-light flex items-center justify-center rounded-full">
          <span className="cart__count text-neutral-dark text-sub1">
            {cartState.length}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
