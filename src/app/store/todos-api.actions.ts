import {TodoItem} from "../todos.service";

export class GetTodosSuccess {
  static readonly type = '[Todo Api] Get items Success'

  constructor(public todos: TodoItem[]) {
  }
}

export class GetTodosFailed {
  static readonly type = '[Todo Api] Get items Failed'

  constructor(public error: string) {
  }
}
