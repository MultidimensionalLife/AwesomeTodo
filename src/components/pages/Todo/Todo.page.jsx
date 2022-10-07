/**
 * @flow
 */

import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Alert} from 'react-native';

import Wrapper from '@templates/Wrapper.template';

import Button from '@components/atoms/Button/Button.atom';

import styled from 'styled-components/native';

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

const StyledToolbarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const StyledInput = styled.TextInput`
  display: flex;
  flex: 1;
  padding: 3px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const StyledListEmptyContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const SyledListEmptyText = styled(StyledRowText)`
  color: #888;
`;

const EmptyComponent = () => {
  return (
    <StyledListEmptyContainer>
      <SyledListEmptyText>Your list is empty!</SyledListEmptyText>
    </StyledListEmptyContainer>
  );
};

const TodoPage = (): React$Node => {
  const {fetchTodos, isFetching, todos, addTodo, removeTodoById} =
    useFetchTodos();

  const [value, onChangeText] = useState('');

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
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Mark as done',
              style: 'destructive',
              onPress: () => removeTodoById(item.id),
            },
          ]);
        }}
      />
    </StyledRowContainer>
  );

  const handleOnRefresh = () => fetchTodos();

  const handleOnAdd = () => {
    if (value !== '') {
      addTodo(value);
      onChangeText('');
    }
  };

  if (isFetching)
    return (
      <Wrapper>
        <ActivityIndicator />
      </Wrapper>
    );

  return (
    <Wrapper>
      <StyledToolbarContainer>
        <StyledInput
          multiline
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Add your Today's task."
          autoFocus={false}
        />
        <StyledVerticalSeparator />
        <Button text="Save" onPress={handleOnAdd} />
      </StyledToolbarContainer>
      <StyledFlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={StyledSeparator}
        ItemSeparatorComponent={StyledSeparator}
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
        ListEmptyComponent={EmptyComponent}
      />
    </Wrapper>
  );
};

export default TodoPage;
