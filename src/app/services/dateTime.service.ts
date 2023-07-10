import { Injectable } from '@angular/core';
import { TaskTodo } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  private dateTimeValue: string;

  setDateTimeValue(value: string) {
    this.dateTimeValue = value;
  }

  getDateTimeValue() {
    return this.dateTimeValue;
  }

  checkExpired(task: TaskTodo): boolean {
    return new Date(task.date).getTime() - new Date().getTime() < 0;
  }

  formatDateTime(dateTime: string) {
    const dateTimeSplit = dateTime.split('T');
    const date = dateTimeSplit[0];
    return new Date(date);
  }

  getCurrenDate() {
    const date = new Date();
    const dateFormat =
      date.toISOString().slice(0, 10) + 'T' + date.toTimeString().slice(0, 5);
    return dateFormat;
  }
}
