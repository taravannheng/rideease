import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../../contexts/user-context";
import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivatePaymentSuccessRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const { cartState } = useContext(CartContext);
  const lsUserState = localStorage.getItem('ls-user-state');
  const lsCartState = localStorage.getItem('ls-cart-state');
  const lsRedirectedToCheckout = JSON.parse(localStorage.getItem('ls-redirected-to-checkout')!);

  return ((userState || lsUserState) && (cartState.length > 0 || JSON.parse(lsCartState!).length > 0) && lsRedirectedToCheckout ) ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
};

export default PrivatePaymentSuccessRoute;
