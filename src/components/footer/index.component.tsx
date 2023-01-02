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
    title: "Services",
    innerItems: ["Car Reservations", "Lorem Ipsum", "Dolor Sit"],
  },
  {
    id: uuidv4(),
    title: "Contacts",
    innerItems: ["Email", "Call Us", "Chat"],
  },
  {
    id: uuidv4(),
    title: "Resources",
    innerItems: ["Investor Relations", "Brand Guidelines", "Developers"],
  },
];

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`footer bg-neutral-grey-1 p-4 sm:p-10 flex flex-col ${className}`}>
      <div className="flex flex-col gap-y-8 md:flex-row md:justify-between">
        <div className="footer__left-section md:basis-1/4">
          <Link to={ROUTES.HOME}>
            <img src={Logo} alt="Logo" className="h-8 sm:h-10 xl:h-12 mb-4" />
          </Link>
          <p className="text-neutral-grey-4 text-sub1 sm:text-body text-left">
            15 Broadway, Ultimo NSW <br />
            2007 Australia
          </p>
        </div>
        <Accordion items={accordionItems} className="md:hidden" />
        <div className="footer__right-section md:basis-3/4 basis:1/2 hidden md:flex flex-row sm:gap-x-10 md:gap-x-24 justify-end lg:justify-start">
          <nav>
            <h4 className="text-h4 text-neutral-dark mb-4">Services</h4>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Car Reservations
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Lorem Ipsum
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Dolor Sit
            </p>
          </nav>
          <nav>
            <h4 className="text-h4 text-neutral-dark mb-4">Contacts</h4>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Email
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Call Us
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Chat
            </p>
          </nav>
          <nav>
            <h4 className="text-h4 text-neutral-dark mb-4">Resources</h4>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Investor Relations
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Brand Guidelines
            </p>
            <p className="text-body text-neutral-grey-4 hover:text-primary cursor-pointer mt-1">
              Developers
            </p>
          </nav>
        </div>
      </div>
      <p className="footer__copyright mt-20 text-neutral-grey-4 text-sub1 sm:text-body text-center">
        All Rights Reserved · {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
