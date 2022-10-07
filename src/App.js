/**
 * @format
 * @flow
 */

import React from 'react';
import {useEffect, useState} from 'react';

import TodoPage from '@components/pages/Todo';
import Loginpage from '@components/pages/Login';

import useAuth, {AuthProvider} from '@components/hooks/useAuth';

const AuthenticatedProcess = () => {
  const {isLogin} = useAuth();

  return isLogin ? <TodoPage /> : <Loginpage />;
};

const App = (): React$Node => {
  return (
    <AuthProvider>
      <AuthenticatedProcess />
    </AuthProvider>
  );
};

export default App;
