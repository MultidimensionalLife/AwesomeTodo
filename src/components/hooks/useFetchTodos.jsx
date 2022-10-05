/**
 * @flow
 */

import React, {useState} from 'react';
import uuid from 'react-native-uuid';

import type {Todos} from '@utils/types/todo.types';
import {getTodosAsync, saveTodoAsync, removeTodoAsync} from '@utils/storage';

type useFetchTodosTypes = {
  todos: Todos,
  isFetching: boolean,
  error: boolean,
  fetchTodos: () => void,
  addTodo: (description: string) => void,
  removeTodoById: (id: string) => void,
};

const useFetchTodos = (): useFetchTodosTypes => {
  const [todos, setTodos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetchTodos = () => {
    setIsFetching(true);

    getTodosAsync().then((response) => {
      if (response.error) {
        setError(true);
      } else {
        setTodos(response.data);
      }

      setIsFetching(false);
    });
  };

  const addTodo = (todoDescription: string) => {
    const newTodo = {
      id: uuid.v4(),
      description: todoDescription,
      status: 1,
    };

    saveTodoAsync(todos, newTodo).then((response) => {
      if (response) {
        setTodos(todos.concat(newTodo));
      }
    });
  };

  const removeTodoById = (id: string) => {
    removeTodoAsync(todos, id).then((response) => {
      if (response) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    });
  };

  return {
    todos,
    isFetching,
    error,
    addTodo,
    fetchTodos,
    removeTodoById,
  };
};

export default useFetchTodos;
