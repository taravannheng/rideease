import { FC } from "react";

// todo: add prop for redirecting to cart page

const Cart: FC = () => {
  return (
    <div className="cart h-12 w-40 bg-primary hover:bg-primary-dark transition border-none text-neutral-light text-body flex items-center justify-between px-6 cursor-pointer">
      <span>Reservations</span>
      <div className="cart__count-container w-6 h-6 bg-neutral-light flex items-center justify-center rounded-full">
        <span className="cart__count text-neutral-dark text-body">0</span>
      </div>
    </div>
  );
};

export default Cart;
