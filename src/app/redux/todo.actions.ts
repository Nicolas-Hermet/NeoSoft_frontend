import { Action } from '@ngrx/store';
import ActionWithPayload from './ActionWithPayload';
import { TodoModel } from '../models/todo.model';

export const GET_TODO = '[ToDo] GET_TODO';
export const GET_TODO_SUCCESS = '[ToDo] GET_TODO_SUCCESS';
export const TODO_ERROR = '[ToDo] TODO_ERROR';

export const CHANGE_TODO = '[ToDo] CHANGE_TODO';
export const CHANGE_TODO_SUCCESS = '[ToDo] CHANGE_TODO_SUCCESS';

export const CREATE_TODO = '[ToDo] CREATE_TODO';
export const CREATE_TODO_SUCCESS = '[ToDo] CREATE_TODO_SUCCESS';

export class GetToDo implements Action {
    readonly type = GET_TODO;

    constructor() { }
}

export class GetToDoSuccess implements ActionWithPayload<TodoModel[]> {
  readonly type = GET_TODO_SUCCESS;
  payload: TodoModel[];

  constructor(payload: TodoModel[]) {
    this.payload = payload;
  }
}

export class ChangeToDo implements ActionWithPayload<TodoModel> {
  readonly type = CHANGE_TODO;
  payload: TodoModel;

  constructor(payload: TodoModel) {
      this.payload = payload;
  }
}

export class ChangeToDoSuccess implements ActionWithPayload<TodoModel> {
  readonly type = GET_TODO_SUCCESS;
  payload: TodoModel;

  constructor(payload: TodoModel) {
    this.payload = payload;
  }
}

export class ToDoError implements Action {
    readonly type: string;
    readonly message: string;

    constructor(type: string, message: string) {
        this.message = message;
        this.type = type;
    }
}

export class CreateToDo implements ActionWithPayload<TodoModel> {
  readonly type = CREATE_TODO;
  payload: TodoModel;

  constructor(payload: TodoModel) {
      this.payload = payload;
  }
}

export class CreateToDoSuccess implements ActionWithPayload<TodoModel> {
  readonly type = CREATE_TODO_SUCCESS;
  payload: TodoModel;

  constructor(payload: TodoModel) {
      this.payload = payload;
  }
}



export type All = GetToDo | GetToDoSuccess | ToDoError | ChangeToDo | ChangeToDoSuccess | CreateToDo | CreateToDoSuccess;
