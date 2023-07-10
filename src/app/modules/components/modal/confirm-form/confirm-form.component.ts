import { Component, OnInit } from '@angular/core';
import { TodoServiceShare } from '../../../../services/sharedService.service';
import { TodoService } from '../../../../services/todo.service';
@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.scss'],
})
export class ConfirmFormComponent implements OnInit {
  openConfirm: boolean;

  constructor(
    private todoShare: TodoServiceShare,
    private todoSer: TodoService
  ) {}

  ngOnInit(): void {
    this.todoShare.confirmModal$.subscribe((res) => (this.openConfirm = res));
  }

  onClose() {
    this.todoShare.confirmModal$.next(false);
  }

  onYes() {
    const id = this.todoShare.taskDelete$.value;

    this.todoSer.deleteTask(id as number).subscribe();
    this.todoShare.taskList$.next(
      this.todoShare.initialList$.value.filter((item) => item.id !== id)
    );
    this.todoShare.initialList$.next(
      this.todoShare.initialList$.value.filter((item) => item.id !== id)
    );

    this.onClose();
  }
}
