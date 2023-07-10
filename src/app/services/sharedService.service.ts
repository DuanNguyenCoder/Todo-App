import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskTodo } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceShare {
  constructor() {}

  filter = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETE: 'COMPLETE',
  };

  taskList$ = new BehaviorSubject<TaskTodo[]>([]);

  initialList$ = new BehaviorSubject<TaskTodo[]>([]);

  openModal$ = new BehaviorSubject<boolean>(false);

  confirmModal$ = new BehaviorSubject<boolean>(false);

  taskDelete$ = new BehaviorSubject<number | null>(null);

  currentTask$ = new BehaviorSubject<TaskTodo | null>(null);

  currentfilter$ = new BehaviorSubject<string>(this.filter.ALL);
}
