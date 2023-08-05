import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function authenticate(token) {
    setAuthToken(token)
    AsyncStorage.setItem("authToken", token)
    setIsAuthenticated(true)
  }

  function logout() {
    setAuthToken("")
    AsyncStorage.removeItem("authToken")
    setIsAuthenticated(false)
  }
  
  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticated,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
