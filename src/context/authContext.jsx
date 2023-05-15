import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthUsername } from '../utils/jwt';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  console.log('Auth Provider Init');
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Auth Provider UseEffect');
    const checkLoggedIn = async () => {
      const cuser = getAuthUsername();
      if (cuser) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setAuthUser(cuser);
    };
    checkLoggedIn();
  }, []);

  const value = useMemo(() => {
    console.log('Auth Provider Init');
    return { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
  }, [authUser, setAuthUser, isLoggedIn, setIsLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
