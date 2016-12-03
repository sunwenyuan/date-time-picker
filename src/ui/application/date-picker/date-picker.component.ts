import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'j17s-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  @Input() dateFormat: string = 'YYYY-MM-DD';

  previousMonthBtnText: string = '<';
  nextMonthBtnText: string = '>';
  headerList: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days: string[] = [];
  showDatePicker: boolean = false;
  currentDate: moment.Moment;
  selectedDate: moment.Moment;
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
  triggerDivId: string;
  clickListener: Function;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {
    this.currentDate = moment().set({
      'hour': 0,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    });
    this.selectedDate = moment().set({
      'hour': 0,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    });
    this.triggerDivId = `j17s-calendar-${moment().valueOf()}`;

    this.clickListener = renderer.listenGlobal(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
  }

  ngOnInit() {
    this.dateDisplay = this.currentDate.format(this.dateFormat);
    this.refreshCalendar();
  }

  handleGlobalClick(event: MouseEvent) {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeCalendar();
    }
  }

  inputFieldClickHandler() {
    this.updateCalendarPosition();
    this.showCalendar();
  }

  showCalendar() {
    this.showDatePicker = true;
  }

  closeCalendar() {
    this.showDatePicker = false;
  }

  updateCalendarPosition() {
    const triggerDivElement: HTMLElement = document.getElementById(this.triggerDivId);
    const { height, top, left, width } = triggerDivElement.getBoundingClientRect();
    const right = window.innerWidth - width - left;
    const bottom = window.innerHeight - height - top;

    this.calendarPosition = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    if (bottom >= this.calendarSize.height) {
      if (right + width > this.calendarSize.width) {
        this.calendarPosition.top = top + height;
        this.calendarPosition.left = left;
      }
      else {
        this.calendarPosition.top = top + height;
        this.calendarPosition.right = right;
      }
    }
    else {
      if (right + width > this.calendarSize.width) {
        this.calendarPosition.bottom = bottom + height;
        this.calendarPosition.left = left;
      }
      else {
        this.calendarPosition.bottom = bottom + height;
        this.calendarPosition.right = right;
      }
    }
  }

  refreshCalendar() {
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
    const totalNumber: number = 42;
    this.days = [];
    for (let index = 0; index < dayOfWeek; index++) {
      this.days.push('');
    }
    const lastDayOfMonth = startDate.add(1, 'months').subtract(1, 'days').date();
    for (let index = 1; index <= lastDayOfMonth; index++) {
      this.days.push(index.toString());
    }
    while (this.days.length < totalNumber) {
      this.days.push('');
    }
  }

  stepMonth(direction: string) {
    if (direction === 'previous') {
      this.currentDate.subtract(1, 'months');
    }
    else {
      this.currentDate.add(1, 'months');
    }
    this.refreshCalendar();
  }

  selectDate(day: string) {
    const year: number = this.currentDate.year();
    const month: number = this.currentDate.month();
    this.selectedDate = moment({
      year,
      month,
      day: parseInt(day, 10)
    });
  }

  getDayDivCls(day: string) {
    const selected = this.selectedDate.year() === this.currentDate.year()
      && this.selectedDate.month() === this.currentDate.month()
      && this.selectedDate.date().toString() === day;
    return selected ? 'selected' : '';
  }
}
