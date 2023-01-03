import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/logos/logo-dark.png";
import Button from "../button/index.component";
import Cart from "../cart/index.component";
import * as ROUTES from "../../utils/constants/routes";

interface HeaderProps {
  type: "landing" | "auth" | "cart";
}

const Header: FC<HeaderProps> = ({ type }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const showMobileNavToggler = () => {
    setShowMobileNav((prevShowMobileNav) => !prevShowMobileNav);
  };

  return (
    <header className="w-full bg-neutral-grey-1 h-12 sm:h-20 px-4 sm:px-10 flex justify-between items-center">
      <Link to={ROUTES.HOME} className={`${type === "auth" && "m-auto"}`}>
        <img
          src={Logo}
          alt="logo"
          className="h-8 sm:h-10 xl:h-12"
        />
      </Link>

      {/* LANDING */}
      {type === "landing" && (
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
        <>
          <Cart />
        </>
      )}
    </header>
  );
};

export default Header;
