import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoModel } from '../models/todo.model';
import {
  GetToDo,
  GetToDoSuccess,
  GET_TODO,
  GET_TODO_ERROR,
  ToDoError
} from './todo.actions';
import { TodosService } from '../services/todos.service';

@Injectable()
export class ToDoEffects {
  constructor(private http: HttpClient, private action$: Actions, private todosService: TodosService) {}

  private ApiURL = 'https://localhost:44360/api/ToDo';
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

}
