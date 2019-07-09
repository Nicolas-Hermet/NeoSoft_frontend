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
          const getTodoSuccessPayload = (action as ActionWithPayload<TodoModel[]>).payload;
          if (getTodoSuccessPayload.length > state.todos.length) {
            return ({
                ...state,
                todos: state.todos.concat(getTodoSuccessPayload)
            });
          } else {
            return  ({
              ...state
            });
          }

      case ToDoActions.CHANGE_TODO:
          const changeTodoPayload = (action as ActionWithPayload<TodoModel>).payload;
          state.todos.map((todo: TodoModel) =>
              todo.id === changeTodoPayload.id ? { ...todo, isDone: !todo.isDone } : todo
            );
          return ({ ...state });


      case ToDoActions.CHANGE_TODO_SUCCESS:
          return ({
            ...state
        });

      case ToDoActions.TODO_ERROR:
          return ({
              ...state,
          });

      default:
          return state;
  }
}
