import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthUsername } from '../utils/jwt';

const AuthConext = createContext();

export const useAuth = () => useContext(AuthConext);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const cuser = getAuthUsername();
      if (cuser === null) {
        setIsLoggedIn(false);
      }
      setAuthUser(cuser);
      setIsLoggedIn(true);
    };

    checkLoggedIn();
  }, []);

  const value = useMemo(() => {
    return { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
  }, [authUser, setAuthUser, isLoggedIn, setIsLoggedIn]);

  console.log('usercontext', authUser, 'isLoggedIn: ', isLoggedIn);

  return <AuthConext.Provider value={value}>{children}</AuthConext.Provider>;
}
