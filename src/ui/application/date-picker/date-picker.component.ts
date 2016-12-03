import { EventTargetLike } from 'rxjs/observable/FromEventObservable';
import { document, EventTarget } from '@angular/platform-browser/src/facade/browser';
import * as console from 'console';
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
  selectedDate: moment.Moment = moment().set({
    'hour': 0,
    'minute': 0,
    'second': 0,
    'millisecond': 0
  });
  dateDisplay: string = '';
  calendarPosition: { top: number; left: number; right: number; bottom: number; } = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  private calendarSize: { width: number; height: number; } = {
    width: 336,
    height: 432
  };
  triggerDivId: string = `j17s-calendar-${moment().valueOf()}`;

  constructor() { }

  ngOnInit() {
    this.dateDisplay = this.currentDate.format('YYYY-MM-DD');
    this.refreshDays();
  }

  inputFieldClickHandler() {
    this.updateCalendarPosition();
    this.showDatePicker = true;
  }

  updateCalendarPosition() {
    const triggerDivElement: HTMLElement = document.getElementById(this.triggerDivId);
    const { height, top, left, width } = triggerDivElement.getBoundingClientRect();
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;
    const right = windowWidth - width - left;
    const bottom = windowHeight - height - top;
    if (bottom >= this.calendarSize.height) {
      if (right + width > this.calendarSize.width) {
        this.calendarPosition.top = top + height;
        this.calendarPosition.left = left;
        this.calendarPosition.bottom = 0;
        this.calendarPosition.right = 0;
      }
      else {
        this.calendarPosition.top = top + height;
        this.calendarPosition.right = right;
        this.calendarPosition.bottom = 0;
        this.calendarPosition.left = 0;
      }
    }
    else {
      if (right + width > this.calendarSize.width) {
        this.calendarPosition.bottom = bottom + height;
        this.calendarPosition.left = left;
        this.calendarPosition.right = 0;
        this.calendarPosition.top = 0;
      }
      else {
        this.calendarPosition.bottom = bottom + height;
        this.calendarPosition.right = right;
        this.calendarPosition.left = left;
        this.calendarPosition.top = 0;
      }
    }
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
