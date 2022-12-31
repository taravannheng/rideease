import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../../contexts/user-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivateRoute: FC = () => {
  const { userState } = useContext(UserContext);

  return userState ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
};

export default PrivateRoute;
