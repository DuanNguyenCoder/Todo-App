import { Component, OnInit, Input } from '@angular/core';
import { TaskTodo } from '../../../../model/task.model';
import { TodoServiceShare } from '../../../../services/sharedService.service';
import { ValidatorService } from '../../../../services/validator.service';
import { TodoService } from '../../../../services/todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
})
export class UpdateFormComponent implements OnInit {
  @Input() listTask: TaskTodo[];
  @Input() Task: TaskTodo;
  formData: FormGroup;
  taskChooseCurrent: TaskTodo | null;
  openModal: boolean = false;

  constructor(
    private todoSer: TodoService,
    private todoShare: TodoServiceShare,
    private fb: FormBuilder,
    private valid: ValidatorService
  ) {}
  ngOnInit(): void {
    this.todoShare.openModal$.subscribe((res) => (this.openModal = res));
    this.todoShare.currentTask$.subscribe(
      (res) => (this.taskChooseCurrent = res)
    );

    this.formData = this.fb.group({
      taskNameForm: [
        this.Task.taskName,
        Validators.compose([Validators.required]),
      ],
      dateTimeForm: this.Task.date,
    });
  }
  onUpdate() {
    const newTaskname = this.formData.value.taskNameForm;
    const newDateTime = this.formData.value.dateTimeForm;
    if (this.valid.validate(newTaskname, newDateTime)) {
      const TaskUpdate = this.listTask.find(
        (item) => item.id == this.taskChooseCurrent!.id
      );
      TaskUpdate!.taskName = newTaskname;
      TaskUpdate!.date = newDateTime;
      this.todoSer
        .updateTask(this.taskChooseCurrent!.id, TaskUpdate!)
        .subscribe();
      this.onCancel();
    }
  }
  onCancel() {
    this.todoShare.openModal$.next(false);
  }
}
