/**
 * @flow
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import {isAuthenticated, setAuthenticated} from '@utils/storage';

type AuthContextTypes = {
  isLogin: boolean,
  validating: boolean,
  validate: () => void,
  logout: () => void,
};

const defaultState: AuthContextTypes = {
  isLogin: false,
  validating: false,
  validate: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextTypes>(defaultState);

export const AuthProvider = ({
  children,
}: {
  children: React$Node,
}): React$Node => {
  const [isLogin, setIsLogin] = useState(false);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    setValidating(true);
    isAuthenticated().then((response) => {
      if (response) {
        setIsLogin(true);
      }
    });
  }, []);

  const validate = () => {
    setAuthenticated().then((response) => {
      setIsLogin(response);
    });
  };

  const logout = () => {
    setAuthenticated(false).then((response) => {
      if (response) setIsLogin(false);

      return;
    });
  };

  const optimizedValues = useMemo(
    () => ({isLogin, validating, validate, logout}),
    [isLogin, validating],
  );

  return (
    <AuthContext.Provider value={optimizedValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextTypes => {
  return useContext(AuthContext);
};

export default useAuth;
