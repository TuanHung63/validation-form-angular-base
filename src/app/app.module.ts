import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { FormControlComponent } from './form-control/form-control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { ContentComponent } from './content/content.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {MatSelectModule} from '@angular/material/select';

const MATERIAL=[
  MatSelectModule
]


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    SelectComponent,
    FormControlComponent,
    TableComponent,
    ContentComponent,
    InputNumberComponent,
    InputPasswordComponent,
    TextAreaComponent,
    DatePickerComponent,
  ],
  imports: [BrowserModule,BrowserAnimationsModule, ReactiveFormsModule, FormsModule,...MATERIAL],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
