import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() placeholder = 'Enter';
  @Input() disabled = false;
  @Input() max: number = 9999;
  @Input() min: number = -9999;
  @Input() step: number = 1;
  constructor() {}
  value!: string;

  _onChange!: (_: any) => void;
  _onTouched!: (_: any) => void;

  onChange(event: any): void {
    if (event === '') {
      event = null;
      this.value = event;
    }
    if (this._onChange) {
      this._onChange(event);
    }
  }
  writeValue(obj: any): void {
    this.value = obj;
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
