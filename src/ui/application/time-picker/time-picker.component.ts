import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'j17s-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.less']
})
export class TimePickerComponent implements OnInit {
  @Input() step: number = 15;

  selectedTime: string;
  timeList: string[];
  elementId: string = `j17s-time-picker-${moment().valueOf()}`;
  constructor() { }

  ngOnInit() {
    if (this.step > 60) {
      this.step = 15;
    }
    this.refreshTimeList();
  }

  refreshTimeList() {
    const movement = moment().set({
      'hour': 0,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    });
    const date: number = movement.date();
    const hour: number = moment().hour();
    const minute: number = moment().minute();
    this.timeList = [];
    while (date === movement.date()) {
      this.timeList.push(movement.format('HH:mm'));
      if (movement.hour() === hour && minute > movement.minute() && (minute - movement.minute()) <= this.step) {
        this.selectedTime = movement.format('HH:mm');
      }
      movement.add(this.step, 'minutes');
    }
  }
}
