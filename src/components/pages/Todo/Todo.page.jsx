/**
 * @flow
 */

import React, {useEffect} from 'react';

import {ActivityIndicator, Alert} from 'react-native';

import Wrapper from '@templates/Wrapper.template';

import Button from '@components/atoms/Button/Button.atom';

import styled from 'styled-components/native';

// import * as LocalAuthentication from 'expo-local-authentication';

import useFetchTodos from '@components/hooks/useFetchTodos';

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
  const {fetchTodos, isFetching, todos, addTodo, removeTodoById} =
    useFetchTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderItem = ({item}) => (
    <StyledRowContainer>
      <StyledRowLeftContainer>
        <StyledRowText>{item.description}</StyledRowText>
      </StyledRowLeftContainer>
      <StyledVerticalSeparator />
      <Button
        text="Done"
        onPress={() => {
          Alert.alert('Mark as done', 'Are you sure to remove this item?', [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              onPress: () => removeTodoById(item.id),
            },
          ]);
        }}
      />
    </StyledRowContainer>
  );

  const handleOnRefresh = () => fetchTodos();

  const handleOnAdd = () => addTodo('Testing');

  if (isFetching)
    return (
      <Wrapper>
        <ActivityIndicator />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Button text="new" onPress={handleOnAdd} />
      <StyledFlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={StyledSeparator}
        ItemSeparatorComponent={StyledSeparator}
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
      />
    </Wrapper>
  );
};

export default TodoPage;
