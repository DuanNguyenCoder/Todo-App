import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateTimeService } from '../../../../services/dateTime.service';
import { TodoService } from '../../../../services/todo.service';
import { ValidatorService } from '../../../../services/validator.service';
import { TodoServiceShare } from '../../../../services/sharedService.service';
import { TaskTodo } from '../../../../model/task.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  @Input() listTask: TaskTodo[];
  formData: FormGroup;
  task: TaskTodo;

  constructor(
    private fbd: FormBuilder,
    private dateTime: DateTimeService,
    private todoSer: TodoService,
    private validateInput: ValidatorService,
    private todoShare: TodoServiceShare
  ) {}

  ngOnInit() {
    this.formData = this.fbd.group({
      taskName: ['', Validators.compose([Validators.required])],
    });
  }

  refeshForm() {
    this.formData.reset();
  }

  handleSubmit() {
    const taskName = this.formData.value.taskName;
    const dateTime =
      this.dateTime.getDateTimeValue() ?? this.dateTime.getCurrenDate();

    if (this.validateInput.validate(taskName, dateTime)) {
      this.todoSer
        .addTask({ taskName, date: dateTime, status: false })
        .subscribe((res) => {
          this.todoShare.taskList$.next([res, ...this.listTask]);
          this.todoShare.initialList$.next([res, ...this.listTask]);
        });
      this.refeshForm();
    }
  }
}
