import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  username: null,
  login: (username: string, token: string, expirationDate?: Date) => {},
  logout: () => {}, // CR: this is good example where you can disable the linter on a per-line basis
                    // https://learn.coderslang.com/0023-eslint-disable-for-specific-lines-files-and-folders/
});
