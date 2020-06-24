import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TO DO LIST FOR 2020';

//  declare todo list
todos =[];
// method to add task to the table data
  addTodo(newTodolabel)
  {
    var newTodo = {
      label:newTodolabel,
      
    }
    this.todos.push(newTodo);
  }
  //method to delet task to the table data
  deleteTodo(todo)
  {
    this.todos = this.todos.filter(t => t.label != todo.label);
  }


}
