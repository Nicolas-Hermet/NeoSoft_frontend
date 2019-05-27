import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const todos: Array<TodoModel> = [
      {title: 'shopping list', state: true, description: 'Milk'},
      {title: 'Technical test', state: false, description: 'spend some time each day to make things happen !'}
    ];

    return { todos };

  }
}