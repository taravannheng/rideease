import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';

import Header from "../../components/header/index.component";
import Carousel from "../../components/carousel/index.component";
import Footer from "../../components/footer/index.component";
import ImgCarAudi from '../../assets/images/car-audi.png'
import ImgCarAudiBlack from '../../assets/images/car-audi-black.png'
import ImgCarLamborghini from '../../assets/images/car-lamborghini.png'

const items = [
  {
    id: uuidv4(),
    src: ImgCarAudi,
    alt: 'Audi Car',
    caption: 'Audi',
    details: {
      category: 'Sedan',
      mileage: '86,000 kms',
      fuelType: 'Petrol',
      seats: '5',
      pricePerDay: 120,
    }
  },
  {
    id: uuidv4(),
    src: ImgCarAudiBlack,
    alt: 'Audi Car',
    caption: 'Audi',
    details: {
      category: 'Sedan',
      mileage: '80,000 kms',
      fuelType: 'Electric',
      seats: '4',
      pricePerDay: 140,
    }
  },
  {
    id: uuidv4(),
    src: ImgCarLamborghini,
    alt: 'Lamborghini Car',
    caption: 'Lamborghini',
    details: {
      category: 'Sports Car',
      mileage: '120,000 kms',
      fuelType: 'Gasoline',
      seats: '2',
      pricePerDay: 240,
    }
  },
]

const BookingPage: FC = () => {
  return (
    <>
      <Header type="cart" />
      <main className="booking">
        <Carousel items={items} />
      </main>
      <Footer className="mt-20" />
    </>
  );
};

export default BookingPage;
