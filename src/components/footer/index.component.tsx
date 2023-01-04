import { FC } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Logo from "../../assets/logos/logo-dark.png";
import Accordion from "../accordion/index.component";
import * as ROUTES from "../../utils/constants/routes";

const currentYear = new Date().getFullYear();
const accordionItems = [
  {
    id: uuidv4(),
    title: "Account",
    innerItems: [
      { text: "Sign In", route: ROUTES.SIGNIN },
      { text: "Sign Up", route: ROUTES.SIGNUP },
      { text: "Reset Password", route: ROUTES.RESET_PASSWORD },
    ],
  },
  {
    id: uuidv4(),
    title: "Contacts",
    innerItems: [
      { text: "Email", route: "" },
      { text: "Call Us", route: "" },
      { text: "Chat", route: "" },
    ],
  },
  {
    id: uuidv4(),
    title: "Resources",
    innerItems: [
      { text: "Investor Relations", route: "" },
      { text: "Brand Guidelines", route: "" },
      { text: "Developers", route: "" },
    ],
  },
];

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer
      className={`footer flex flex-col bg-neutral-grey-1 p-4 sm:p-10 ${className}`}
    >
      <div className="flex flex-col gap-y-8 md:flex-row md:justify-between">
        <div className="footer__left-section md:basis-1/4">
          <Link to={ROUTES.HOME}>
            <img src={Logo} alt="Logo" className="mb-4 h-8 sm:h-10 xl:h-12" />
          </Link>
          <p className="text-left text-sub1 text-neutral-grey-4 sm:text-body">
            15 Broadway, Ultimo NSW <br />
            2007 Australia
          </p>
        </div>
        <Accordion items={accordionItems} className="md:hidden" />
        <div className="footer__right-section basis:1/2 hidden flex-row justify-end sm:gap-x-10 md:flex md:basis-3/4 md:gap-x-24 lg:justify-start">
          <nav>
            <h4 className="mb-4 text-h4 text-neutral-dark">Account</h4>
            <Link to={ROUTES.SIGNIN}>
              <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
                Sign In
              </p>
            </Link>
            <Link to={ROUTES.SIGNUP}>
              <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
                Sign Up
              </p>
            </Link>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Reset Password
            </p>
          </nav>
          <nav>
            <h4 className="mb-4 text-h4 text-neutral-dark">Contacts</h4>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Email
            </p>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Call Us
            </p>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Chat
            </p>
          </nav>
          <nav>
            <h4 className="mb-4 text-h4 text-neutral-dark">Resources</h4>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Investor Relations
            </p>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Brand Guidelines
            </p>
            <p className="mt-1 cursor-pointer text-body text-neutral-grey-4 hover:text-primary">
              Developers
            </p>
          </nav>
        </div>
      </div>
      <p className="footer__copyright mt-20 text-center text-sub1 text-neutral-grey-4 sm:text-body">
        All Rights Reserved · {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
