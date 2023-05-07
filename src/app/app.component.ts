import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AddTodoItem, GetTodos} from "./store/todos.actions";
import {TodosState, TodoStateModel} from "./store/todos.state";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngxs';
  todoTitle: string = '';
  @Select(TodosState.viewModel) vm$!: Observable<TodoStateModel>

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetTodos())
  }


  addTodo() {
    this.store.dispatch(new AddTodoItem({title: this.todoTitle, done: false})).pipe(
      tap(() => {
        this.store.dispatch(new GetTodos())
      })
    ).subscribe()
  }
}
