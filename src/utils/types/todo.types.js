/**
 * @flow
 */

export type Todo = {
  id: string,
  description: string,
  status: number,
};

export type Todos = Array<Todo>;

type UserTodo = {
  id: string,
  todos: Todos,
};
