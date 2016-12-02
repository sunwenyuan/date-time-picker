import { start } from 'repl';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'j17s-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  previousMonthBtnText: string = '<';
  nextMonthBtnText: string = '>';
  headerList: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days: string[] = [];
  showDatePicker: boolean = false;
  currentDate: moment.Moment = moment().set({
    'hour': 0,
    'minute': 0,
    'second': 0,
    'millisecond': 0
  });
  dateDisplay: string = '';

  constructor() { }

  ngOnInit() {
    this.dateDisplay = this.currentDate.format('YYYY-MM-DD');
    this.refreshDays();
  }

  inputFieldClickHandler() {
    this.showDatePicker = true;
  }

  refreshDays() {
    const year = this.currentDate.year();
    const month = this.currentDate.month();
    const date = 1;
    const startDate = moment({
      year,
      month,
      date,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    const dayOfWeek = startDate.day();
    this.days = [];
    for (let index = 0; index < dayOfWeek; index++) {
      this.days.push('');
    }
    const lastDayOfMonth = startDate.add(1, 'months').subtract(1, 'days').date();
    for (let index = 1; index <= lastDayOfMonth; index++) {
      this.days.push(index.toString());
    }
  }

  previousMonthBtnHandler() {
    this.currentDate.subtract(1, 'months');
    this.refreshDays();
  }

  nextMonthBtnHandler() {
    this.currentDate.add(1, 'months');
    this.refreshDays();
  }

  closeBtnHandler() {
    this.showDatePicker = false;
  }
}
