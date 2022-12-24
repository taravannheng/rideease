import { FC, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

interface AccordionProps {
  items: { id: string, title: string; innerItems: string[] }[];
  className?: string;
}

const Accordion: FC<AccordionProps> = ({ items, className }) => {
  const [expandedItem, setExpandedItem] = useState<null | number>(null)

  const toggle = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null)
      return ;
    }

    setExpandedItem(index);
  }

  return (
    <ul className={`accordion ${className}`}>
      {items.map((item, index) => (
        <li key={item.id} className={`transition border-[1px] border-neutral-grey-2 overflow-hidden mb-2 p-2 cursor-pointer ${expandedItem === index ? 'h-auto' : 'h-10'}`}>
          <h4 onClick={() => toggle(index)} className="text-h4 text-neutral-dark hover:text-primary flex flex-row justify-between items-center mb-2">{item.title} <FontAwesomeIcon icon={expandedItem === index ? faMinus : faPlus} /></h4>
          {
            item.innerItems.map(innerItem => (
              <p key={uuidv4()} className="text-body text-neutral-grey-4 mt-2">{innerItem}</p>
            ))
          }
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
