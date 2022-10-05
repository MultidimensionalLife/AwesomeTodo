/**
 * @flow
 */

import React from 'react';

import styled from 'styled-components/native';

const StyledButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? 'rgba(12, 45, 72, 0.5)' : '#FF4500'};
  display: flex;
  align-self: baseline;
  padding: 10px 15px;
  border-radius: 5px;
`;

const StyledButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

type ButtonPropTypes = {
  text: string,
  onPress: () => void,
  disabled?: boolean,
};

const Button = ({
  text,
  onPress,
  disabled = false,
}: ButtonPropTypes): React$Node => (
  <StyledButtonContainer
    {...(disabled ? null : {onPress})}
    activeOpacity={disabled ? 10 : 0.8}
    disabled={disabled}>
    <StyledButtonText>{text}</StyledButtonText>
  </StyledButtonContainer>
);

export default Button;
