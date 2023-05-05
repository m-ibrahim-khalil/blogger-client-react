import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthUsername } from '../utils/jwt';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const cuser = getAuthUsername();
      console.log('current user: ', cuser);
      if (cuser) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setAuthUser(cuser);
    };
    checkLoggedIn();
  }, []);

  const value = useMemo(() => {
    return { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
  }, [authUser, setAuthUser, isLoggedIn, setIsLoggedIn]);

  console.log('usercontext', authUser, 'isLoggedIn: ', isLoggedIn);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
