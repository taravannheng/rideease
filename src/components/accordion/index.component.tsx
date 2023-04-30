import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

interface AccordionProps {
  items: {
    id: string;
    title: string;
    innerItems: { text: string; route: string }[];
  }[];
  className?: string;
}

const Accordion: FC<AccordionProps> = ({ items, className }) => {
  const [expandedItem, setExpandedItem] = useState<null | number>(null);

  const toggle = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
      return;
    }

    setExpandedItem(index);
  };

  return (
    <ul className={`accordion ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`mb-2 cursor-pointer overflow-hidden border-b-[1px] border-neutral-grey-2 p-2 pb-0`}
        >
          <h4
            onClick={() => toggle(index)}
            className="mb-2 flex flex-row items-center justify-between text-body font-medium text-neutral-dark hover:text-primary sm:text-h4"
          >
            {item.title}{" "}
            <FontAwesomeIcon
              icon={expandedItem === index ? faChevronUp : faChevronDown}
            />
          </h4>
          <div
            className={`transition-all duration-500 ${
              expandedItem === index ? `h-full` : "m-0 h-0 p-0"
            }`}
          >
            {item.innerItems.map((innerItem) => (
              <Link to={innerItem.route}>
                <p className="mt-2 text-sub1 text-neutral-grey-4 sm:text-body">
                  {innerItem.text}
                </p>
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
