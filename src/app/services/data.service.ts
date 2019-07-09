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
      {id: 1, title: 'shopping list', isDone: true, description: 'Milk'},
      {id: 2, title: 'Technical test', isDone: false, description: 'spend some time each day to make things happen !'}
    ];

    return { todos };

  }

  genId(todos: Array<TodoModel>): number {
    console.log('on passe dans le générateur d\'ID');
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
