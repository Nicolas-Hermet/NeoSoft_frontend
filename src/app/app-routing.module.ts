import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo/todo.component';

const routes: Routes = [
  { path: '', children: [
    {path: '', component: TodosComponent},
    {path: 'todo/:todoId', component: TodoComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
