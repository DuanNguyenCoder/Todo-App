import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../../../services/dateTime.service';
@Component({
  selector: 'app-todo-date-time-pick',
  templateUrl: './todo-date-time-pick.component.html',
  styleUrls: ['./todo-date-time-pick.component.scss'],
})
export class TodoDateTimePickComponent implements OnInit {
  dateTimeDefault: string;
  dateTest: string;
  constructor(private dateTime: DateTimeService) {}

  ngOnInit(): void {
    this.dateTimeDefault = this.dateTime.getCurrenDate();
  }

  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dateTimeDefault = inputElement.value;
    this.dateTime.setDateTimeValue(this.dateTimeDefault);
  }
}
