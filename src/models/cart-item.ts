interface CartItemModel {
  id: string;
  imgSrc: string;
  alt: string;
  className?: string;
  name: string;
  details: {
    category: string;
    mileage: number;
    fuelType: string;
    seats: number;
    pricePerDay: number;
  };
}

export default CartItemModel;