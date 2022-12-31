import { useState, createContext } from "react"

const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [productState, setProductState] = useState([])

  return <ProductContext.Provider value={{
    productState,
    setProductState
  }}>
    {children}
  </ProductContext.Provider>
}

export {ProductContextProvider}
export default ProductContext