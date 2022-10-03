/**
 * @flow
 */

import React from 'react';

import Wrapper from '@templates/Wrapper.template';

import Button from '@components/atoms/Button/Button.atom';

import styled from 'styled-components/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'First Item asdasd asd asdasdasdadssdsdasdasdsadsadsadsadsadsadasdsqdsadasdasdasd asdasdasdasdasdasdasdasd',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const StyledFlatList = styled.FlatList``;

const StyledRowContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: white;
`;

const StyledRowLeftContainer = styled.View`
  display: flex;
  flex: 1;
`;

const StyledRowText = styled.Text`
  font-size: 14px;
`;

const StyledSeparator = styled.View`
  height: 5px;
`;

const StyledVerticalSeparator = styled.View`
  width: 10px;
`;

const TodoPage = (): React$Node => {
  const renderItem = ({item}) => (
    <StyledRowContainer>
      <StyledRowLeftContainer>
        <StyledRowText>{item.title}</StyledRowText>
      </StyledRowLeftContainer>
      <StyledVerticalSeparator />
      <Button text="Done" onPress={() => alert(1)} />
    </StyledRowContainer>
  );

  return (
    <Wrapper>
      <StyledFlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={StyledSeparator}
        ItemSeparatorComponent={StyledSeparator}
      />
    </Wrapper>
  );
};

export default TodoPage;
