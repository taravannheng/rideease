import { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";

import Logo from "../../assets/logos/logo-dark.png";
import Button from "../button/index.component";
import Cart from "../cart/index.component";
import * as ROUTES from "../../utils/constants/routes";
import UserContext from "../../contexts/user-context";

interface HeaderProps {
  type: "auth" | "logo-only" | "cart" | "sign-out";
}

const Header: FC<HeaderProps> = ({ type }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { userState, setUserState } = useContext(UserContext);
  const navigate = useNavigate();

  const showMobileNavToggler = () => {
    setShowMobileNav((prevShowMobileNav) => !prevShowMobileNav);
  };

  const signOutHandler = async () => {
    // sign out from firebase auth
    const auth = getAuth();
    await signOut(auth);

    // update state
    setUserState(null);

    // remove state from local storage
    localStorage.removeItem("ls-user-state");

    // redirect to home page
    navigate(ROUTES.HOME);
  };

  return (
    <header className="w-full bg-neutral-grey-1 h-12 sm:h-20 px-4 sm:px-10 flex justify-between items-center">
      <Link to={ROUTES.HOME} className={`${type === "logo-only" && "m-auto"}`}>
        <img src={Logo} alt="logo" className="h-8 sm:h-10 xl:h-12" />
      </Link>

      {/* AUTH */}
      {type === "auth" && (
        <>
          <nav className="buttonContainer w-56 gap-x-1 hidden xl:flex">
            <Link to={ROUTES.SIGNIN} className="w-full">
              <Button type="button" buttonStyle="text">
                Sign In
              </Button>
            </Link>
            <Link to={ROUTES.SIGNUP} className="w-full">
              <Button type="button" buttonStyle="text" className="text-primary">
                Sign Up
              </Button>
            </Link>
          </nav>
          <FontAwesomeIcon
            icon={faBars}
            className="w-5 h-5 text-neutral-dark xl:hidden cursor-pointer"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute w-screen flex flex-col items-center pt-20 gap-y-8 h-screen bg-neutral-grey-1 top-0 left-0 ${
              !showMobileNav && "translate-x-full"
            } transition`}
          >
            <Link to={ROUTES.SIGNIN}>
              <Button type="button" buttonStyle="text">
                Sign In
              </Button>
            </Link>
            <Link to={ROUTES.SIGNUP}>
              <Button type="button" buttonStyle="text">
                Sign Up
              </Button>
            </Link>
            <FontAwesomeIcon
              icon={faXmark}
              className="w-5 h-5 cursor-pointer text-neutral-dark absolute top-4 right-4"
              onClick={showMobileNavToggler}
            />
          </nav>
        </>
      )}

      {/* CART */}
      {type === "cart" && (
        <div className="flex flex-row gap-x-8 items-center">
          <Cart />
          <nav className="buttonContainer gap-x-1 hidden xl:flex">
            <Button
              type="button"
              buttonStyle="text"
              className="w-full"
              onClick={signOutHandler}
            >
              Sign Out
            </Button>
          </nav>
          <FontAwesomeIcon
            icon={faBars}
            className="w-5 h-5 text-neutral-dark xl:hidden cursor-pointer"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute z-50 w-screen flex flex-col items-center pt-20 gap-y-8 h-screen bg-neutral-grey-1 top-0 left-0 ${
              !showMobileNav && "translate-x-full"
            } transition`}
          >
            <Button type="button" buttonStyle="text" onClick={signOutHandler}>
              Sign Out
            </Button>
            <FontAwesomeIcon
              icon={faXmark}
              className="w-5 h-5 cursor-pointer text-neutral-dark absolute top-4 right-4"
              onClick={showMobileNavToggler}
            />
          </nav>
        </div>
      )}

      {/* SIGN OUT */}
      {type === "sign-out" && (
        <>
          <nav className="buttonContainer gap-x-1 hidden xl:flex">
            <Button
              type="button"
              buttonStyle="text"
              className="w-full"
              onClick={signOutHandler}
            >
              Sign Out
            </Button>
          </nav>
          <FontAwesomeIcon
            icon={faBars}
            className="w-5 h-5 text-neutral-dark xl:hidden cursor-pointer"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute w-screen flex flex-col items-center pt-20 gap-y-8 h-screen bg-neutral-grey-1 top-0 left-0 ${
              !showMobileNav && "translate-x-full"
            } transition`}
          >
            <Button type="button" buttonStyle="text" onClick={signOutHandler}>
              Sign Out
            </Button>
            <FontAwesomeIcon
              icon={faXmark}
              className="w-5 h-5 cursor-pointer text-neutral-dark absolute top-4 right-4"
              onClick={showMobileNavToggler}
            />
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
