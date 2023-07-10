import { Component, OnInit } from '@angular/core';
import { TodoService } from '../app/services/todo.service';
import { TodoServiceShare } from '../app/services/sharedService.service';
import { TaskTodo } from '../app/model/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: TaskTodo[];
  count: number;
  filter: string;

  constructor(
    private todoSer: TodoService,
    public todoShare: TodoServiceShare
  ) {
    this.todoSer.getList().subscribe((res) => {
      this.todoShare.initialList$.next(res as TaskTodo[]);
      this.todoShare.taskList$.next(res as TaskTodo[]);
    });
  }
  ngOnInit(): void {
    this.todoShare.taskList$.subscribe((res) => {
      this.data = res;
      this.count = this.data.length;
      this.filter = this.todoShare.currentfilter$.value;
    });
  }
}
