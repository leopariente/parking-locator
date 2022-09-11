import { useState, useEffect, useCallback } from 'react';

let logoutTimer: any;

export const useAuth = () => {
  const [token, setToken] = useState<string>('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);
  const [username, setUsername] = useState<string>('');

  const login = useCallback(
    (username: string, token: string, expirationDate: Date | undefined) => {
      setToken(token);
      setUsername(username);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: token,
          username: username,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken('');
    setUsername('');
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const remainingTime = tokenExpirationDate?.getTime()! - new Date().getTime();
    if (token && tokenExpirationDate) {
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') as string);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.username,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, username };
};
