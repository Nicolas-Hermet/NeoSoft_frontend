import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { MatCardModule } from '@angular/material/card';
import { TodosService } from '../services/todos.service';
import { of } from 'rxjs';


describe('TodosComponent', () => {

  // let component: TodosComponent;
  // let fixture: ComponentFixture<TodosComponent>;
  const service = jasmine.createSpyObj('TodosService', ['getTodos']);

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TodosComponent],
    imports: [MatCardModule],
    providers: [{provide: TodosService, useValue: service}]
  }).compileComponents());

  it('should display every todo title', () => {
    service.getTodos.and.returnValue(of([
      { title: 'shopping list', description: 'Milk', state: true},
      { title: 'Technical test', description: 'spend some time each day to make things happen !', state: false}
    ]));

    const fixture = TestBed.createComponent(TodosComponent);
    fixture.detectChanges();

    expect(service.getTodos).toHaveBeenCalled();

  });


  it('should create', () => {
    const fixture = TestBed.createComponent(TodosComponent);
    const component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();

    });
  });


  it('should have at minimal 2 attribute : state and title', () => {
    const fixture = TestBed.createComponent(TodosComponent);
    const component = fixture.componentInstance;
    const todos = fixture.componentInstance.todos;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(Object.keys(todos[0]).length).toBeGreaterThan(2);
      expect(todos[0].hasOwnProperty('state')).toBeDefined();
      expect(todos[0].hasOwnProperty('title')).toBeDefined();
    });
  });

  it('should contain every todo title', () => {
    const fixture = TestBed.createComponent(TodosComponent);
    const component = fixture.componentInstance;
    const todos = fixture.componentInstance.todos;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(todos).not.toBeNull();
      expect(todos.length).toBe(2);
      expect(todos[0].title).toBe('shopping list');
      expect(todos[1].title).toBe('Technical test');
    });
  });

  it('should contain every todo description', () => {
    const fixture = TestBed.createComponent(TodosComponent);
    const component = fixture.componentInstance;
    const todos = fixture.componentInstance.todos;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(todos[0].description).toBe('Milk');
      expect(todos[1].description).toBe('spend some time each day to make things happen !');
    });
  });

  it('should display every todo card', () => {
    const fixture = TestBed.createComponent(TodosComponent);
    const element = fixture.nativeElement;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const cards = element.querySelectorAll('mat-card-title');
      expect(cards.length).withContext('You should have as much card as cards').toBe(2);
    });
  });

});
