import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodosService } from './todos.service';
import { TodoModel } from '../models/todo.model';

describe('TodosService', () => {
  let todosService: TodosService;
  let http: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    todosService = TestBed.get(TodosService);
    http = TestBed.get(HttpTestingController);
  });

  afterAll(() => http.verify());

  it('should return an Observable of 2 todos', () => {
    // fake response
    const hardcodedTodos = [{ title: 'shopping list' }, { title: 'Technical test' }] as Array<TodoModel>;

    let actualTodos: Array<TodoModel> = [];
    todosService.getTodos().subscribe((todos: Array<TodoModel>) => actualTodos = todos);

    http.expectOne('http://localhost:8080/api/todos')
      .flush(hardcodedTodos);

    expect(actualTodos.length)
      .withContext('The `getTodos` method should return an array of TodoModel wrapped in an Observable')
      .not.toBe(0);
    expect(actualTodos).toEqual(hardcodedTodos);
  });
});
