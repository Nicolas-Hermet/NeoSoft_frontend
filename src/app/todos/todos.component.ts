import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  todos: Array<TodoModel> = [
    {title: 'shopping list', state: true, description: 'Milk'},
    {title: 'Technical test', state: false, description: 'spend some time each day to make things happen !'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
