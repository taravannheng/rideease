import { FC, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../button/index.component";
import CartContext from "../../contexts/cart-context";

interface CarouselProps {
  items: {
    id: string;
    src: string;
    alt: string;
    className?: string;
    caption: string;
    details?: {
      category: string;
      mileage: string;
      fuelType: string;
      seats: string;
      pricePerDay: number;
    };
  }[];
}

const Carousel: FC<CarouselProps> = ({ items }) => {
  // STATES
  const [activeItem, setActiveItem] = useState(0);

  // CONTEXTS
  const {cartState, setCartState} = useContext(CartContext);

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
    if (cartState.find((item: any) => item.id === items[activeItem].id)) {
      setCartState(cartState.filter((item: any) => item.id !== items[activeItem].id));
      return ;
    }

    setCartState((prevCartState: CarouselProps[]) => ([...prevCartState, items[activeItem]]));
  }

  return (
    <div className="carousel relative">
      <div
        className={`${
          activeItem === 0 && "hidden"
        } carousel__left-icon w-10 h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full left-5 sm:left-10 lg:left-40 top-28 lg:top-48 z-10`}
        onClick={carouselLeftIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="w-5 h-5 text-neutral-dark cursor-pointer hover:text-primary"
        />
      </div>
      <ul
        className={`landing__car-preview-slides flex flex-row w-full mt-10 transition`}
        style={{ transform: `translate(-${activeItem * 100}%, 0px)` }}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`carousel-item-${index} min-w-full flex flex-col items-center`}
          >
            <figure>
              <img
                src={item.src}
                alt={item.alt}
                className={`max-h-60 lg:h-96 lg:max-h-96 ${item.className}`}
              />
              <figcaption className="text-center text-neutral-grey-4">
                {item.caption}
              </figcaption>
            </figure>
            {item?.details && (
              <div className="bg-neutral-grey-1 flex flex-col w-2/3 gap-y-2 md:gap-y-0 items-start md:flex-row md:w-[560px] p-4 md:p-8 md:justify-between md:items-center mt-8">
                <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                  <p className="text-neutral-grey-4 text-sub1">Category</p>
                  <p className="text-neutral-dark">{item.details.category}</p>
                </div>
                <div className="flex flex-row gap-x-12 justify-between w-full md:w-auto items-center md:flex-col md:items-center md:justify-center">
                  <p className="text-neutral-grey-4 text-sub1">Mileage</p>
                  <p className="text-neutral-dark">{item.details.mileage}</p>
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
                  <p className="text-neutral-grey-4 text-sub1">Price Per Day</p>
                  <p className="text-neutral-dark">
                    {item.details.pricePerDay}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {items[0]?.details && (
        <div className="booking__book-button flex items-center justify-center mt-16">
          <Button
            className="min-w-[8rem] w-32 max-w-lg"
            buttonStyle="primary"
            type="button"
            onClick={cartHandler}
          >
            {cartState.find((item: any) => item.id === items[activeItem].id) ? 'Added to Cart' : 'Book Now'}
          </Button>
        </div>
      )}
      <div
        className={`${
          activeItem === items.length - 1 && "hidden"
        } carousel__right-icon w-10 h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full right-5 sm:right-10 lg:right-40 top-28 lg:top-48 z-10`}
        onClick={carouselRightIconHandler}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="w-5 h-5 text-neutral-dark cursor-pointer hover:text-primary"
        />
      </div>
    </div>
  );
};

export default Carousel;
