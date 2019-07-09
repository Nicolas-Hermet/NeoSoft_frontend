import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: Observable<Array<TodoModel>>;
  SERVER_URL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  getTodos() {
    return this.httpClient.get<Array<TodoModel>>(this.SERVER_URL + 'todos');
  }

  changeTodo(todo: TodoModel) {
    return this.httpClient.post<TodoModel>(`${this.SERVER_URL + 'todos'}/${todo.id}`, todo);
  }

  createTodo(todo: TodoModel) {
    return this.httpClient.post<TodoModel>(`${this.SERVER_URL + 'todos'}`, todo);
  }

}
