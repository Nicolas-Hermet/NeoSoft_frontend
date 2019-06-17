import { TodoModel } from '../models/todo.model';


export interface ToDoState {
    todos: Array<TodoModel>;
}

export const initializeState = (): ToDoState => {
  return ({
      todos: [],
  });
}
