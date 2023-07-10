import { Component, OnInit } from '@angular/core';
import { TaskTodo } from '../../../../model/task.model';
import { TodoServiceShare } from '../../../../services/sharedService.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  data: TaskTodo[] = [];

  constructor(private sharedSer: TodoServiceShare) {}
  ngOnInit(): void {
    this.sharedSer.taskList$.subscribe((res) => {
      this.data = res;
    });
  }

  findTask(name: string) {
    this.sharedSer.taskList$.next(
      this.sharedSer.initialList$.value.filter((item) =>
        item.taskName.includes(name)
      )
    );
  }
}
