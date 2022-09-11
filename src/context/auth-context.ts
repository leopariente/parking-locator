import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  username: '',
  login: (username: string, token: string, expirationDate?: Date) => {},
  // eslint-disable-next-line
  logout: () => {}, 
});
