//useAuthContext just call AuthContext and store the stuff in useAuthContext, when we use useAuthContext we get things which are in AuthContext like user data

import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext); //get data from AuthContext and return that data

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}
