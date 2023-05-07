import {TodoItem} from "../todos.service";

export class GetTodos {
  static readonly type = '[Todo Page] Get Todos'
}

export class DeleteItem {
  static readonly type = '[Todo Page] Get Todos'

  constructor(id: number) {
  }
}

export class AddTodoItem {
  static readonly type = '[Todo Page] Add Todo'

  constructor(public todoItem: Pick<TodoItem, 'title' | 'done'>) {
  }
}

