import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select, Action } from '@ngrx/store';
import { ToDoState } from 'src/app/redux/todo.state';
import { Observable, Subscription } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { map } from 'rxjs/operators';
import { GET_TODO } from 'src/app/redux/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todo: TodoModel;
  todoId: string;

  toDoState$: Observable<ToDoState>;
  toDoSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<ToDoState>) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('todoId');
    });
    this.toDoState$ = this.store.pipe(select('todos'));
    const getToDoAction: Action = {
      type: GET_TODO
    };
    this.toDoSubscription = this.toDoState$.pipe(map((x) => {
      this.todo = x.todos.find( o => o.id === parseInt(this.todoId, 10));
    })).subscribe();
    this.store.dispatch(getToDoAction);
  }

}
