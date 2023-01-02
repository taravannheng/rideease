import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../../contexts/user-context";
import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivateCartRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const { cartState } = useContext(CartContext);
  const lsUserState = localStorage.getItem('ls-user-state');
  const lsCartState = localStorage.getItem('ls-cart-state');

  return ((userState || lsUserState) && (cartState?.length > 0 || JSON.parse(lsCartState!)?.length > 0) ) ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
};

export default PrivateCartRoute;
