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
  GET_TODO_ERROR,
  ToDoError,
  ChangeToDoSuccess
} from './todo.actions';
import { TodosService } from '../services/todos.service';

@Injectable()
export class ToDoEffects {
  constructor(private http: HttpClient, private action$: Actions, private todosService: TodosService) {}

  @Effect()
  GetToDos$: Observable<Action> = this.action$.pipe(
    ofType<GetToDo>(GET_TODO),
    mergeMap(() =>
      this.todosService.getTodos().pipe(
        map(data => {
          console.log('Effects Web Api call: ', data);
          return new GetToDoSuccess(data as TodoModel[]);
        }),
        catchError(error => {
          console.error('Http Call Error: ', error);
          return of(new ToDoError(GET_TODO_ERROR, error.message));
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
            map(data => {
              console.log('Effects Post Web Api call success: ', action.payload);
              return new ChangeToDoSuccess(action.payload as TodoModel);
            }),
            catchError(error => {
              console.error('Http Call Error: ', error);
              return of(new ToDoError(GET_TODO_ERROR, error.message));
            })
          )
      )
    );
}
