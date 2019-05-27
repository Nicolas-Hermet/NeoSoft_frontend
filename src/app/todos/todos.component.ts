import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  todos: Array<TodoModel>;

  constructor(private todosService: TodosService) {
    this.todosService.getTodos().subscribe((data: Array<TodoModel>) => {
      console.log(data);
      this.todos = data;
    });
   }

  ngOnInit() {
  }
}
