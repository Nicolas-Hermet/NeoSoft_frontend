import ActionWithPayload from './ActionWithPayload';
import { TodoModel } from '../models/todo.model';
import * as ToDoActions from './todo.actions';
import { Action } from '@ngrx/store';
import { ToDoState, initializeState } from './todo.state';

const initialState = initializeState();

export function ToDoReducer(state: ToDoState = initialState,
                            action: Action) {

  let actionWithPayload: Array<any>;

  switch (action.type) {
      case ToDoActions.GET_TODO:
        return { ...state };

        case ToDoActions.GET_TODO_SUCCESS:
          actionWithPayload = (action as ActionWithPayload<TodoModel[]>).payload;
          if (actionWithPayload.length >= state.todos.length) {
            return ({
                ...state,
                todos: state.todos.concat((action as ActionWithPayload<TodoModel[]>).payload)
            });
          } else {
            state.todos.map((x) => x.id === actionWithPayload.id ? x =  actionWithPayload : x);
            return  ({
              ...state
            });
          }

      case ToDoActions.CHANGE_TODO:
          actionWithPayload = (action as ActionWithPayload<TodoModel>).payload;
          state.todos.map((todo: TodoModel) =>
              todo.id === actionWithPayload.id ? { ...todo, isDone: !todo.isDone } : todo
            );
          return ({ ...state });


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
