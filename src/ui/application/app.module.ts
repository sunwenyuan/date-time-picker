import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DatePickerComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
