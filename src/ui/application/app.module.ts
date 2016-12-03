import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DatePickerComponent,
    TimePickerComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
