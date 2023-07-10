import { Component, OnInit } from '@angular/core';
import { TodoServiceShare } from '../../../services/sharedService.service';
import { DateTimeService } from '../../../services/dateTime.service';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit {
  count: number;
  filter: string;

  constructor(
    private todoSer: TodoService,
    public todoShare: TodoServiceShare,
    private dateTime: DateTimeService
  ) {}

  ngOnInit(): void {
    this.todoShare.currentfilter$.subscribe((res) => {
      this.filter = res;
    });
    this.todoShare.taskList$.subscribe((res) => (this.count = res.length));
  }

  onClear() {
    this.todoShare.taskList$.value.map((item) => {
      if (item.status) {
        const TaskChangeStatus = item;
        TaskChangeStatus.status = false;
        this.todoSer.updateTask(item.id, TaskChangeStatus).subscribe();
      }
    });

    this.todoShare.initialList$.value.map((item) => {
      if (item.status) {
        item.status = false;
      }
    });
    this.todoShare.taskList$.next(this.todoShare.taskList$.value);
  }
  onAll() {
    this.todoShare.currentfilter$.next(this.todoShare.filter.ALL);
    this.todoShare.taskList$.next(this.todoShare.initialList$.value);
  }
  onComplete() {
    this.todoShare.currentfilter$.next(this.todoShare.filter.COMPLETE);
    this.todoShare.taskList$.next(
      this.todoShare.initialList$.value.filter((item) => item.status)
    );
  }
  onActive() {
    this.todoShare.currentfilter$.next(this.todoShare.filter.ACTIVE);
    this.todoShare.taskList$.next(
      this.todoShare.initialList$.value.filter(
        (item) => !item.status && !this.dateTime.checkExpired(item)
      )
    );
  }
}
