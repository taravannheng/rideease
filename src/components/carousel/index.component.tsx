import { FC, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CarouselProps {
  items: {id: string, src: string, alt: string, className?: string, caption: string}[]
}

const Carousel: FC<CarouselProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);

  const carouselLeftIconHandler = () => {
    if (activeItem !== 0) {
      setActiveItem(prevItem => prevItem - 1);
    }
  }
  
  const carouselRightIconHandler = () => {
    if (activeItem < items.length - 1) {
      setActiveItem(prevItem => prevItem + 1);
    }
  }

  return (
    <div className="carousel relative">
      <div className={`${activeItem === 0 && 'hidden'} carousel__left-icon w-10 h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full left-5 sm:left-10 lg:left-40 top-28 lg:top-48 z-10`} onClick={carouselLeftIconHandler}>
        <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 text-neutral-dark cursor-pointer hover:text-primary" />
      </div>
      <ul className={`landing__car-preview-slides flex flex-row w-full mt-10 transition`} style={{ transform: `translate(-${activeItem * 100}%, 0px)` }}>
        {items.map((item, index) => (
          <li key={item.id} className={`carousel-item-${index} min-w-full flex flex-col items-center`}>
            <figure>
              <img src={item.src} alt={item.alt} className={`max-h-60 lg:h-96 lg:max-h-96 ${item.className}`} />
              <figcaption className="text-center text-neutral-grey-4">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className={`${activeItem === items.length - 1 && 'hidden'} carousel__right-icon w-10 h-10 absolute flex justify-center items-center bg-neutral-grey-1 rounded-full right-5 sm:right-10 lg:right-40 top-28 lg:top-48 z-10`} onClick={carouselRightIconHandler}>
        <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 text-neutral-dark cursor-pointer hover:text-primary" />
      </div>
    </div>
  );
};

export default Carousel;
