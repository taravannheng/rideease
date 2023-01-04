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
      <div className="cart flex h-8 cursor-pointer items-center justify-between gap-x-2 border-none bg-primary px-4 text-body text-neutral-light transition hover:bg-primary-dark sm:h-12 sm:gap-x-4 sm:px-6">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]"
        />
        <div className="cart__count-container flex h-4 w-4 items-center justify-center rounded-full bg-neutral-light sm:h-6 sm:w-6">
          <span className="cart__count text-sub1 text-neutral-dark">
            {cartState.length}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
