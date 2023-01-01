import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../../contexts/user-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivateBookingRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const lsUserState = localStorage.getItem('ls-user-state');

  return (userState || lsUserState) ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
};

export default PrivateBookingRoute;
