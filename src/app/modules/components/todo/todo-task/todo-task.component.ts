import { Component, Input, OnInit } from '@angular/core';
import { TaskTodo } from '../../../../model/task.model';
import { TodoService } from '../../../../services/todo.service';
import { TodoServiceShare } from '../../../../services/sharedService.service';
import { DateTimeService } from '../../../../services/dateTime.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
})
export class TodoTaskComponent implements OnInit {
  @Input() task: TaskTodo;
  @Input() listTask: TaskTodo[];
  isExpired: boolean;
  expAfterOneHour: boolean;
  minutes: number;
  miliHour: number = 3600000;
  miliMinutes: number = 60000;

  constructor(
    private todoSer: TodoService,
    private todoShare: TodoServiceShare,
    private dateTime: DateTimeService
  ) {}
  ngOnInit(): void {
    this.isExpired = this.dateTime.checkExpired(this.task);
    this.countDown();
  }

  countDown() {
    setInterval(() => {
      const dateTodo = new Date(this.task.date);
      const time = dateTodo.getTime() - new Date().getTime();

      this.isExpired = this.dateTime.checkExpired(this.task);

      if (time < this.miliHour) {
        this.minutes = Math.floor((time % this.miliHour) / this.minutes) + 1;
        this.expAfterOneHour = true;
      } else {
        this.expAfterOneHour = false;
      }
    }, 1000);
  }

  onUpdate(item: TaskTodo) {
    this.todoShare.openModal$.next(!this.todoShare.openModal$.getValue());
    this.todoShare.currentTask$.next(item);
  }

  onDelete(id: number) {
    this.todoShare.taskDelete$.next(id);
    this.todoShare.confirmModal$.next(true);
  }

  onChangeStatus() {
    const TaskChangeStatus = this.task;
    TaskChangeStatus.status = !TaskChangeStatus.status;
    this.todoSer.updateTask(this.task.id, TaskChangeStatus).subscribe();
  }
}
