import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { DateTimeService } from './dateTime.service';
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(
    private toast: ToastService,
    private dateTimeSer: DateTimeService
  ) {}

  noti = {
    title: {
      notification: 'Notification',
      taskNameInvalid: 'Task invalid',
      dateInvalid: 'Date invalid',
    },
    content: {
      taskNameError: 'Task name must have 2 words or more',
      dateError: 'Expired time must be greater than or equal to today',
      success: 'Success',
    },
  };

  atLeastTwoWord(taskName: string) {
    if (taskName.length > 1) {
      return true;
    }
    this.toast.showError(
      this.noti.title.taskNameInvalid,
      this.noti.content.taskNameError
    );
    return false;
  }

  checkDateTime(dateTime: string) {
    const currentDate = new Date(this.dateTimeSer.getCurrenDate());
    const dateExpired = new Date(dateTime);

    if (currentDate <= dateExpired) return true;
    this.toast.showError(
      this.noti.title.dateInvalid,
      this.noti.content.dateError
    );
    return false;
  }

  validate(taskName: string, dateTime: string) {
    if (!this.atLeastTwoWord(taskName) || !this.checkDateTime(dateTime)) {
      return false;
    }
    this.toast.showSuccess(
      this.noti.title.notification,
      this.noti.content.success
    );
    return true;
  }
}
