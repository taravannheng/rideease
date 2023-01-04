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
        <motion.li
          layout
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.15 },
          }}
          style={{ height: `${expandedItem === index ? "auto" : "2.5rem"}` }}
          key={item.id}
          className={`mb-2 cursor-pointer overflow-hidden border-b-[1px] border-neutral-grey-2 p-2`}
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
          {item.innerItems.map((innerItem) => (
            <Link to={innerItem.route} key={uuidv4()}>
              <p className="mt-2 text-sub1 text-neutral-grey-4 sm:text-body">
                {innerItem.text}
              </p>
            </Link>
          ))}
        </motion.li>
      ))}
    </ul>
  );
};

export default Accordion;
