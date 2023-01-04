import { FC } from "react";

import Divider from "../divider/index.component";
import Button from "../button/index.component";
import CartItemModel from "../../models/cart-item";

interface CartItemProps {
  className: string;
  item: CartItemModel;
  onClick: (e: Event) => void;
}

const CartItem: FC<CartItemProps> = ({ item, className, onClick }) => {
  const { id, imgSrc, alt, details } = item;

  return (
    <li
      key={id}
      className={` flex w-full flex-row items-center justify-between ${className} min-h-[52px] md:min-h-[100px]`}
    >
      <div className=" min-h-[52px] basis-1/3 md:min-h-[100px]">
        <div className="flex w-full justify-center">
          <img
            src={imgSrc}
            alt={alt}
            className="pointer-events-none h-[52px] select-none md:h-[100px]"
          />
        </div>
      </div>
      <div className="relative flex min-h-[52px] basis-2/3 items-center md:min-h-[100px]">
        <div className="flex w-full flex-row">
          <p className="flex basis-1/2 justify-center">
            ${details.pricePerDay!}
          </p>
          <div className="flex basis-1/2 justify-center">
            <Button
              buttonStyle="text"
              type="button"
              id={id}
              className="!p-0 hover:text-status-error"
              onClick={onClick}
            >
              Remove
            </Button>
          </div>
        </div>
        <Divider className="absolute bottom-0 right-0 w-full" />
      </div>
    </li>
  );
};

export default CartItem;
