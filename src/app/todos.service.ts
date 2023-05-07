import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface TodoItem {
  title: string,
  id: number,
  done: boolean
}

@Injectable({providedIn: 'root'})
export class TodosService {
  readonly baseUrl = "http://localhost:3000/todos"

  constructor(private http: HttpClient) {
  }

  getTodos() {
    return this.http.get<TodoItem[]>(this.baseUrl)
  }

  deleteItem(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  addTodoItem(todoItem: Pick<TodoItem, 'title' | 'done'>) {
    return this.http.post<TodoItem>(this.baseUrl, todoItem)
  }
}
