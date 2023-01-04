import { FC, useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../button/index.component";
import CartContext from "../../contexts/cart-context";
import CartItemModel from "../../models/cart-item";

interface CarouselProps {
  items: CartItemModel[];
  showDetails?: boolean;
  showBookButton?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  items,
  showDetails = true,
  showBookButton = true,
}) => {
  // CONTEXTS
  const { cartState, setCartState } = useContext(CartContext);

  // STATES
  const [activeItem, setActiveItem] = useState(0);

  // HANDLERS
  const carouselLeftIconHandler = () => {
    if (activeItem !== 0) {
      setActiveItem((prevItem) => prevItem - 1);
    }
  };

  const carouselRightIconHandler = () => {
    if (activeItem < items.length - 1) {
      setActiveItem((prevItem) => prevItem + 1);
    }
  };

  const cartHandler = () => {
    if (
      cartState.find((item: CartItemModel) => item.id === items[activeItem].id)
    ) {
      const filteredCart = cartState.filter(
        (item: CartItemModel) => item.id !== items[activeItem].id
      );

      setCartState(filteredCart);
      localStorage.setItem("ls-cart-state", JSON.stringify(filteredCart));
      return;
    }

    setCartState((prevCartState: CarouselProps[]) => [
      ...prevCartState,
      items[activeItem],
    ]);

    localStorage.setItem(
      "ls-cart-state",
      JSON.stringify([...cartState, items[activeItem]])
    );
  };

  useEffect(() => {
    const lsCartState = localStorage.getItem("ls-cart-state");
    if (lsCartState) {
      setCartState(JSON.parse(lsCartState!));
    }
  }, []);

  return (
    <div className="carousel relative w-full">
      <div
        className={`${
          activeItem === 0 && "hidden"
        } carousel__left-icon absolute left-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-grey-1 sm:left-10 sm:h-10 sm:w-10 lg:left-24 xl:left-40 ${
          showDetails
            ? "top-12 sm:top-20 lg:top-40"
            : "top-20 sm:top-28 lg:top-48"
        } z-10`}
        onClick={carouselLeftIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="h-4 w-4 cursor-pointer text-neutral-dark hover:text-primary sm:h-5 sm:w-5"
        />
      </div>
      <AnimatePresence>
        <motion.ul
          className={`landing__car-preview-slides mt-10 flex w-full flex-row transition`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateX: `-${activeItem * 100}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`carousel-item-${index} flex min-w-full flex-col items-center`}
            >
              <figure>
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className={`pointer-events-none h-32 max-h-60 select-none sm:h-48 lg:h-96 lg:max-h-96 ${item.className}`}
                />
                <figcaption className="mt-4 text-center text-neutral-grey-4">
                  {item.name}
                </figcaption>
              </figure>
              {showDetails && (
                <div className="mt-4 flex w-[340px] flex-row items-start items-center justify-between bg-neutral-grey-1 p-4 sm:mt-8 md:w-[560px] md:p-8">
                  <div className="flex w-full w-auto flex-col items-center justify-center">
                    <p className="text-sub2 text-neutral-grey-4 md:text-sub1">
                      Category
                    </p>
                    <p className="text-sub1 text-neutral-dark md:text-body">
                      {item.details.category}
                    </p>
                  </div>
                  <div className="flex w-full w-auto flex-col items-center justify-center">
                    <p className="text-sub2 text-neutral-grey-4 md:text-sub1">
                      Mileage
                    </p>
                    <p className="text-sub1 text-neutral-dark md:text-body">
                      {item.details.mileage.toLocaleString()} kms
                    </p>
                  </div>
                  <div className="flex w-full w-auto flex-col items-center justify-center">
                    <p className="text-sub2 text-neutral-grey-4 md:text-sub1">
                      Fuel Type
                    </p>
                    <p className="text-sub1 text-neutral-dark md:text-body">
                      {item.details.fuelType}
                    </p>
                  </div>
                  <div className="flex w-full w-auto flex-col items-center justify-center">
                    <p className="text-sub2 text-neutral-grey-4 md:text-sub1">
                      Seats
                    </p>
                    <p className="text-sub1 text-neutral-dark md:text-body">
                      {item.details.seats}
                    </p>
                  </div>
                  <div className="flex w-full w-auto flex-col items-center justify-center">
                    <p className="text-sub2 text-neutral-grey-4 md:text-sub1">
                      Price Per Day
                    </p>
                    <p className="text-sub1 text-neutral-dark md:text-body">
                      ${item.details.pricePerDay}
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      {showBookButton && (
        <div className="booking__book-button mt-8 flex items-center justify-center sm:mt-16">
          <Button
            className="w-24 min-w-[7rem] max-w-lg py-2 sm:w-32 sm:min-w-[8rem] sm:max-w-lg sm:py-3"
            buttonStyle="primary"
            type="button"
            onClick={cartHandler}
          >
            {cartState.find(
              (item: CartItemModel) =>
                item.id ===
                JSON.parse(localStorage.getItem("ls-product-state")!)[
                  activeItem
                ].id
            )
              ? "Added to Cart"
              : "Book Now"}
          </Button>
        </div>
      )}
      <div
        className={`${
          activeItem === items.length - 1 && "hidden"
        } carousel__right-icon absolute right-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-grey-1 sm:right-10 sm:h-10 sm:w-10 lg:right-24 xl:right-40 ${
          showDetails
            ? "top-12 sm:top-20 lg:top-40"
            : "top-20 sm:top-28 lg:top-48"
        } z-10`}
        onClick={carouselRightIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="h-4 w-4 cursor-pointer text-neutral-dark hover:text-primary sm:h-5 sm:w-5"
        />
      </div>
    </div>
  );
};

export default Carousel;
