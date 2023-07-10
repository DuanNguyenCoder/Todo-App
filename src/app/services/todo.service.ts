import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskTodo } from '../model/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  baseURL: string = 'https://641d540d1a68dc9e461be701.mockapi.io/api/todo';

  getList() {
    return this.http.get(this.baseURL);
  }

  getTask(id: number) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  addTask(value: object): Observable<TaskTodo> {
    return this.http.post<TaskTodo>(this.baseURL, value);
  }

  deleteTask(id: number): Observable<TaskTodo> {
    return this.http.delete<TaskTodo>(`${this.baseURL}/${id}`);
  }

  updateTask(id: number, value: Object): Observable<TaskTodo> {
    return this.http.put<TaskTodo>(`${this.baseURL}/${id}`, value);
  }
}
