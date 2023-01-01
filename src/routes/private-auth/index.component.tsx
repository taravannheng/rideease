import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../../contexts/user-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivateAuthRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const lsUserState = localStorage.getItem('ls-user-state');

  return (userState || lsUserState) ? <Navigate to={ROUTES.BOOKING} /> : <Outlet />;
};

export default PrivateAuthRoute;
