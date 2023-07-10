import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: NgToastService) {}

  time: number = 2500;

  showInfo(title: string, content: string) {
    this.toast.info({
      detail: title,
      summary: content,
      duration: this.time,
    });
  }
  showSuccess(title: string, content: string) {
    this.toast.success({
      detail: title,
      summary: content,
      duration: this.time,
    });
  }
  showError(title: string, content: string) {
    this.toast.error({
      detail: title,
      summary: content,
      duration: this.time,
    });
  }
}
