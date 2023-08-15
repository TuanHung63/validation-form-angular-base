import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as DateFns from 'date-fns';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() placeholder = 'Select Date';
  @Input() disabled = false;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  constructor() {}
  value!: string | null;

  _onChange!: (_: any) => void;
  _onTouched!: (_: any) => void;

  onChange(event: any): void {
    const value: string | null = DateFns.isValid(event)
      ? DateFns.format(event, 'dd/MM/yyyy')
      : null;
    this.value = value;
    if (this._onChange) {
      this._onChange(value);
    }
  }
  writeValue(obj: any): void {
    const date = new Date(obj);
    this.value =
      obj && DateFns.isValid(date) ? DateFns.format(date, 'dd/MM/yyyy') : null;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
