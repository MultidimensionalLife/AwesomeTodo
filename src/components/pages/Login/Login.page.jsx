/**
 * @flow
 */
import React, {useState} from 'react';

import styled from 'styled-components/native';

import * as LocalAuthentication from 'expo-local-authentication';

import Button from '@components/atoms/Button';

import {setAuthenticated} from '@utils/storage';
import useAuth from '@components/hooks/useAuth';

const StyledLoginContainer = styled.View`
  display: flex;
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;

const StyledStatus = styled.Text`
  color: red;
  font-size: 12px;
`;

const LoginPage = (): React$Node => {
  const {validate} = useAuth();

  const [authentication, setAuthentication] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleOnAuthentication = async () => {
    setAuthentication('Checking hardware compatibility...');
    setButtonDisabled(true);

    const compatible = await LocalAuthentication.hasHardwareAsync();

    if (!compatible) {
      setAuthentication('This device is not compatible');
      return;
    }

    setAuthentication('This device is compatible');
    setButtonDisabled(false);

    const haveEnrolledAuthentication =
      await LocalAuthentication.isEnrolledAsync();

    if (!haveEnrolledAuthentication) {
      setAuthentication('Please enroll your face id or biometrics');
      return;
    } else {
      /**
       * if user have enrolled bio or face
       */
      const verifyUser = await LocalAuthentication.authenticateAsync();

      if (verifyUser.success) {
        validate();
      } else {
        setAuthentication('Device authentication was cancelled');
      }
    }
  };

  return (
    <StyledLoginContainer>
      <StyledStatus>{authentication}</StyledStatus>
      <Button
        text="Login"
        onPress={handleOnAuthentication}
        disabled={isButtonDisabled}
      />
    </StyledLoginContainer>
  );
};

export default LoginPage;
