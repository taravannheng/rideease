import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import _ from "lodash";

import UserContext from "../../contexts/user-context";
import CartContext from "../../contexts/cart-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivatePaymentSuccessRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const { cartState } = useContext(CartContext);
  const lsUserState = localStorage.getItem('ls-user-state');
  const lsCartState = localStorage.getItem('ls-cart-state');
  const lsRedirectedToCheckout = JSON.parse(localStorage.getItem('ls-redirected-to-checkout')!);

  return ((!_.isEmpty(userState) || !_.isEmpty(JSON.parse(lsUserState!))) && (!_.isEmpty(cartState) || !_.isEmpty(JSON.parse(lsCartState!))) && lsRedirectedToCheckout ) ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
};

export default PrivatePaymentSuccessRoute;
