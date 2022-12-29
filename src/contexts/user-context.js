import { useState, createContext } from "react"

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState(null)

  return <UserContext.Provider value={{
    userState,
    setUserState
  }}>
    {children}
  </UserContext.Provider>
}

export {UserContextProvider}
export default UserContext