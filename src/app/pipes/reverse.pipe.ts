import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<TodoModel>, args?: any): any {
    return value.sort( (a, b) => {
      return b.id - a.id;
    });
  }

}
