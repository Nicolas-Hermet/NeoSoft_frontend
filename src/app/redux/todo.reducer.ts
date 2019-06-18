import ActionWithPayload from './ActionWithPayload';
import { TodoModel } from '../models/todo.model';
import * as ToDoActions from './todo.actions';
import { Action } from '@ngrx/store';
import { ToDoState, initializeState } from './todo.state';

const initialState = initializeState();

export function ToDoReducer(state: ToDoState = initialState,
                            action: Action) {

  switch (action.type) {
      case ToDoActions.GET_TODO:
          return { ...state };

      case ToDoActions.GET_TODO_SUCCESS:
          return ({
              ...state,
              todos: state.todos.concat((action as ActionWithPayload<TodoModel[]>).payload)
          });

      case ToDoActions.CHANGE_TODO:
          const actionWithPayload = (action as ActionWithPayload<TodoModel>).payload;
          return ({ ...state,
            todos: state.todos.map((todo: TodoModel) =>
              todo.id === actionWithPayload.id ? { ...todo, isDone: !todo.isDone } : todo
            ) });


      case ToDoActions.CHANGE_TODO_SUCCESS:
          return ({
            ...state
        });

      case ToDoActions.GET_TODO_ERROR:
          return ({
              ...state,
          });

      default:
          return state;
  }
}
