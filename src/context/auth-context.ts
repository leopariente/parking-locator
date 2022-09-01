import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false, 
    token: null,
    username: null,
    login: (username: string, token: string, expirationDate?: Date) => {}, 
    logout: () => {}
})