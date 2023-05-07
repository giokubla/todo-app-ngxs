import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TodoItem, TodosService} from "../todos.service";
import {catchError, of, tap} from "rxjs";
import {AddTodoItem, DeleteItem, GetTodos} from "./todos.actions";
import {GetTodosFailed, GetTodosSuccess} from "./todos-api.actions";
import {HttpErrorResponse} from "@angular/common/http";

export interface TodoStateModel {
  todos: TodoItem[];
  loading: boolean;
  error: string;

}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    loading: false,
    error: ''
  }
})
@Injectable()
export class TodosState {
  constructor(private todoService: TodosService) {
  }

  @Action(GetTodos) getTodos(ctx: StateContext<TodoStateModel>) {
    ctx.patchState({loading: true})
    return this.todoService.getTodos().pipe(
      tap((items) => ctx.dispatch(new GetTodosSuccess(items))),
      catchError((error: HttpErrorResponse) => {
        ctx.dispatch(new GetTodosFailed(error.message))
        return of(null)
      })
    );
  }

  @Action(GetTodosSuccess) getToDoSuccess(ctx: StateContext<TodoStateModel>, action: GetTodosSuccess) {
    ctx.patchState({
      todos: action.todos,
      loading: false
    })
  }

  @Action(GetTodosFailed) GetTodosFailed(ctx: StateContext<TodoStateModel>, action: GetTodosFailed) {
    ctx.patchState({
      error: action.error,
      loading: false
    })
  }

  @Action(AddTodoItem) addTodoItem(ctx: StateContext<TodoStateModel>, action: AddTodoItem) {
    return this.todoService.addTodoItem(action.todoItem);
  }

  @Action([GetTodos, AddTodoItem, DeleteItem]) loadingEffect(ctx: StateContext<TodoStateModel>) {
    ctx.patchState({loading: true})
  }

  @Selector()
  static viewModel(state: TodoStateModel) {
    return state;
  }
}
