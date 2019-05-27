import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { MatCardModule } from '@angular/material/card';
import { TodosService } from '../services/todos.service';
import { of } from 'rxjs';


describe('TodosComponent', () => {

  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  const service = jasmine.createSpyObj('TodosService', ['getTodos']);

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TodosComponent],
    imports: [MatCardModule],
    providers: [{ provide: TodosService, useValue: service }]
  }));

  it('should display every race name in a title', () => {
    service.getTodos.and.returnValue(of([
      { title: 'shopping list', description: 'Milk', state: true},
      { title: 'Technical test', description: 'spend some time each day to make things happen !', state: false}
    ]));

    fixture = TestBed.createComponent(TodosComponent);
    fixture.detectChanges();

    expect(service.getTodos).toHaveBeenCalled();

  });


  it('should create', () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should have at minimal 2 attribute : state and title', () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const todos = fixture.componentInstance.todos;
    expect(Object.keys(todos[0]).length).toBeGreaterThan(2);
    expect(todos[0].hasOwnProperty('state')).toBeDefined();
    expect(todos[0].hasOwnProperty('title')).toBeDefined();
  });

  it('should contain every todo title', () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const todos = fixture.componentInstance.todos;
    expect(todos).not.toBeNull();
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('shopping list');
    expect(todos[1].title).toBe('Technical test');
  });

  it('should contain every todo description', () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    const todos = fixture.componentInstance.todos;
    fixture.detectChanges();
    expect(todos[0].description).toBe('Milk');
    expect(todos[1].description).toBe('spend some time each day to make things happen !');
  });

  it('should display every todo card', () => {
    const element = fixture.nativeElement;
    const cards = element.querySelectorAll('mat-card-title');
    expect(cards.length).withContext('You should have as much card as cards').toBe(2);
  });

});
