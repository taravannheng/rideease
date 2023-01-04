import { useState, createContext } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartState, setCartState] = useState([]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider };
export default CartContext;
