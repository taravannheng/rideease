interface CartItemModel {
  id: string;
  src: string;
  alt: string;
  className?: string;
  caption: string;
  details: {
    category: string;
    mileage: string;
    fuelType: string;
    seats: string;
    pricePerDay: number;
  };
}

export default CartItemModel;