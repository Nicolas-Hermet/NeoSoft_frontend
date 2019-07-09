import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoModel } from '../models/todo.model';
import {
  ChangeToDo,
  CHANGE_TODO,
  GetToDo,
  GetToDoSuccess,
  GET_TODO,
  TODO_ERROR,
  ToDoError,
  ChangeToDoSuccess,
  CreateToDo,
  CREATE_TODO,
  CreateToDoSuccess
} from './todo.actions';
import { TodosService } from '../services/todos.service';

@Injectable()
export class ToDoEffects {
  constructor(private http: HttpClient, private action$: Actions, private todosService: TodosService) {}

  @Effect()
  GetToDos$: Observable<Action> = this.action$.pipe(
    ofType<GetToDo>(GET_TODO),
    mergeMap((action) =>
      this.todosService.getTodos().pipe(
        map(data => {
          console.log('Effects GetTodo : ', data);
          return new GetToDoSuccess(data as TodoModel[]);
        }),
        catchError(error => {
          console.error('Http Call Error: ', error);
          return of(new ToDoError(TODO_ERROR, error.message));
        })
      )
    )
  );

  @Effect()
  ChangeTodo$: Observable<Action> = this.action$
    .pipe(
      ofType<ChangeToDo>(CHANGE_TODO),
      mergeMap(action =>
        this.todosService.changeTodo(action.payload)
          .pipe(
            map(() => {
              console.log('Effects PutTodo payload : ', action.payload);
              return new ChangeToDoSuccess(action.payload as TodoModel);
            }),
            catchError(error => {
              console.error('Http Call Error: ', error);
              return of(new ToDoError(TODO_ERROR, error.message));
            })
          )
      )
    );

  @Effect()
  CreateToDos$: Observable<Action> = this.action$
    .pipe(
      ofType<CreateToDo>(CREATE_TODO),
      mergeMap(action =>
        this.todosService.createTodo(action.payload)
          .pipe(
            map(data => {
              console.log('Effects Post Http call success: ', data);
              return new CreateToDoSuccess(action.payload as TodoModel);
            }),
            catchError(error => {
              console.error('Http Call Error: ', error);
              return of(new ToDoError(TODO_ERROR, error.message));
            })
          )
      )
    );
}
