import { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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
    <header className="flex h-12 w-full items-center justify-between bg-neutral-grey-1 px-4 sm:h-20 sm:px-10">
      <Link to={ROUTES.HOME} className={`${type === "logo-only" && "m-auto"}`}>
        <img src={Logo} alt="logo" className="h-8 sm:h-10 xl:h-12" />
      </Link>

      {/* AUTH */}
      {type === "auth" && (
        <>
          <nav className="buttonContainer hidden w-56 gap-x-1 xl:flex">
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
            className="h-5 w-5 cursor-pointer text-neutral-dark xl:hidden"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute top-0 left-0 flex h-screen w-screen flex-col items-center gap-y-8 bg-neutral-grey-1 pt-20 ${
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
              className="absolute top-4 right-4 h-5 w-5 cursor-pointer text-neutral-dark"
              onClick={showMobileNavToggler}
            />
          </nav>
        </>
      )}

      {/* CART */}
      {type === "cart" && (
        <div className="flex flex-row items-center gap-x-8">
          <Cart />
          <nav className="buttonContainer hidden gap-x-1 xl:flex">
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
            className="h-5 w-5 cursor-pointer text-neutral-dark xl:hidden"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute top-0 left-0 z-50 flex h-screen w-screen flex-col items-center gap-y-8 bg-neutral-grey-1 pt-20 ${
              !showMobileNav && "translate-x-full"
            } transition`}
          >
            <Button type="button" buttonStyle="text" onClick={signOutHandler}>
              Sign Out
            </Button>
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 h-5 w-5 cursor-pointer text-neutral-dark"
              onClick={showMobileNavToggler}
            />
          </nav>
        </div>
      )}

      {/* SIGN OUT */}
      {type === "sign-out" && (
        <>
          <nav className="buttonContainer hidden gap-x-1 xl:flex">
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
            className="h-5 w-5 cursor-pointer text-neutral-dark xl:hidden"
            onClick={showMobileNavToggler}
          />
          <nav
            className={`mobile-nav absolute top-0 left-0 flex h-screen w-screen flex-col items-center gap-y-8 bg-neutral-grey-1 pt-20 ${
              !showMobileNav && "translate-x-full"
            } transition`}
          >
            <Button type="button" buttonStyle="text" onClick={signOutHandler}>
              Sign Out
            </Button>
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 h-5 w-5 cursor-pointer text-neutral-dark"
              onClick={showMobileNavToggler}
            />
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
