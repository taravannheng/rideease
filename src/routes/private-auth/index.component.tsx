import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import _ from "lodash";

import UserContext from "../../contexts/user-context";
import * as ROUTES from "../../utils/constants/routes";

const PrivateAuthRoute: FC = () => {
  const { userState } = useContext(UserContext);
  const lsUserState = localStorage.getItem('ls-user-state');

  return (!_.isEmpty(userState) || !_.isEmpty(JSON.parse(lsUserState!))) ? <Navigate to={ROUTES.BOOKING} /> : <Outlet />;
};

export default PrivateAuthRoute;
