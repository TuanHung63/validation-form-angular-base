import {
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor {
  @Input() placeholder = '•••••••••';
  @Input() disabled = false;
  constructor() {}
  value!: string;
  passwordVisible: boolean = false;
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
  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
