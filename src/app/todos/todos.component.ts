import { Component, OnInit, OnDestroy } from '@angular/core';

import { TodoModel } from '../models/todo.model';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select, Action } from '@ngrx/store';
import { ToDoState } from '../redux/todo.state';
import ActionWithPayload from '../redux/ActionWithPayload';
import { CHANGE_TODO, GET_TODO, CREATE_TODO } from '../redux/todo.actions';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit, OnDestroy {

  todos: Array<TodoModel>;

  toDoState$: Observable<ToDoState>;
  toDoSubscription: Subscription;


  todoForm: FormGroup;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  title: string;
  description: string;

  constructor(private store: Store<ToDoState>, fb: FormBuilder) {
    this.titleCtrl = fb.control('', [Validators.required]);
    this.descriptionCtrl = fb.control('');
    this.todoForm = fb.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl
    });
  }

  ngOnInit() {
    this.toDoState$ = this.store.pipe(select('todos'));
    const getToDoAction: Action = {
      type: GET_TODO
    };
    this.toDoSubscription = this.toDoState$.pipe(map((x) => {
      this.todos = x.todos;
    })).subscribe();
    this.store.dispatch(getToDoAction);
  }


  changeTodo(i: number) {
    const todo = this.todos[i];
    todo.isDone = !this.todos[i].isDone;
    const todoAction: ActionWithPayload<TodoModel> = {
      type: CHANGE_TODO,
      payload:  {
        id: todo.id,
        title: todo.title,
        isDone: todo.isDone,
        description: todo.description
      }
    };
    this.store.dispatch(todoAction);
  }

  createToDo() {
    const title = this.todoForm.get('title').value;
    const description = this.todoForm.get('description').value;
    const todoAction: ActionWithPayload<TodoModel> = {
      type: CREATE_TODO,
      payload: { title, isDone: false, description } as TodoModel
    };
    this.store.dispatch(todoAction);
  }

  ngOnDestroy() {
      this.toDoSubscription.unsubscribe();
  }
}
