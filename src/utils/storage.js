/**
 * @flow
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import type {Todo, Todos} from '@utils/types/todo.types';

type ResponseType = {
  data: Todos,
  error: boolean,
};

const TODO_KEY = '@TODO';
const AUTH_KEY = '@AUTH';

const setAuthenticated = async (state: boolean = true): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({isLogin: state}));
    return true;
  } catch (e) {
    return false;
  }
};

const isAuthenticated = async (): Promise<boolean> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_KEY);

    return jsonValue !== null && JSON.parse(jsonValue).isLogin ? true : false;
  } catch (e) {
    return false;
  }
};

const getTodosAsync = async (): Promise<ResponseType> => {
  let response = {
    error: false,
    data: [],
  };

  try {
    const jsonValue = await AsyncStorage.getItem(TODO_KEY);
    if (jsonValue !== null) {
      response = {
        ...response,
        data: JSON.parse(jsonValue),
      };
    }

    return response;
  } catch (e) {
    return response;
  }
};

const saveTodoAsync = async (
  pastTodos: Todos,
  newTodo: Todo,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(
      TODO_KEY,
      JSON.stringify([newTodo, ...pastTodos]),
    );

    return true;
  } catch (e) {
    return false;
  }
};

const removeTodoAsync = async (
  pastTodos: Todos,
  id: string,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(
      TODO_KEY,
      JSON.stringify(pastTodos.filter((todo) => todo.id !== id)),
    );

    return true;
  } catch (e) {
    return false;
  }
};

export {
  getTodosAsync,
  saveTodoAsync,
  removeTodoAsync,
  setAuthenticated,
  isAuthenticated,
};
