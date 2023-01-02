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
        } carousel__left-icon w-8 h-8 sm:w-10 sm:h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full left-5 sm:left-10 lg:left-24 xl:left-40 top-20 sm:top-28 lg:top-48 z-10`}
        onClick={carouselLeftIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-dark cursor-pointer hover:text-primary"
        />
      </div>
      <AnimatePresence>
        <motion.ul
          className={`landing__car-preview-slides flex flex-row w-full mt-10 transition`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateX: `-${activeItem * 100}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`carousel-item-${index} min-w-full flex flex-col items-center`}
            >
              <figure>
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className={`h-32 sm:h-48 max-h-60 lg:h-96 lg:max-h-96 pointer-events-none select-none ${item.className}`}
                />
                <figcaption className="text-center text-neutral-grey-4">
                  {item.name}
                </figcaption>
              </figure>
              {showDetails && (
                <div className="bg-neutral-grey-1 flex flex-col w-2/3 gap-y-2 md:gap-y-0 items-start md:flex-row md:w-[560px] p-4 md:p-8 md:justify-between md:items-center mt-8">
                  <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                    <p className="text-neutral-grey-4 text-sub1">Category</p>
                    <p className="text-neutral-dark">{item.details.category}</p>
                  </div>
                  <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                    <p className="text-neutral-grey-4 text-sub1">Mileage</p>
                    <p className="text-neutral-dark">
                      {item.details.mileage.toLocaleString()} kms
                    </p>
                  </div>
                  <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                    <p className="text-neutral-grey-4 text-sub1">Fuel Type</p>
                    <p className="text-neutral-dark">{item.details.fuelType}</p>
                  </div>
                  <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                    <p className="text-neutral-grey-4 text-sub1">Seats</p>
                    <p className="text-neutral-dark">{item.details.seats}</p>
                  </div>
                  <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                    <p className="text-neutral-grey-4 text-sub1">
                      Price Per Day
                    </p>
                    <p className="text-neutral-dark">
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
        <div className="booking__book-button flex items-center justify-center mt-16">
          <Button
            className="min-w-[8rem] w-32 max-w-lg"
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
        } carousel__right-icon w-8 h-8 sm:w-10 sm:h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full right-5 sm:right-10 lg:right-24 xl:right-40 top-20 sm:top-28 lg:top-48 z-10`}
        onClick={carouselRightIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-dark cursor-pointer hover:text-primary"
        />
      </div>
    </div>
  );
};

export default Carousel;
