/**
 * @flow
 */

import React from 'react';

import {StatusBar} from 'react-native';

import styled from 'styled-components/native';

type WrapperPropTypes = {children: React$Node};

const StyledView = styled.View`
  display: flex;
  flex: 1;
  padding: 0 5px;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: #b1d4e0;
  display: flex;
  flex: 1;
`;

const Wrapper = ({children}: WrapperPropTypes): React$Node => {
  return (
    <StyledSafeAreaView>
      <StatusBar />
      <StyledView>{children}</StyledView>
    </StyledSafeAreaView>
  );
};

export default Wrapper;
