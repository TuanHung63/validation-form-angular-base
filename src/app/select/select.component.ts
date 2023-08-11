import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface OptionModel<T = string> {
  value: T;
  label: string;
  shortCode?: string;
  class?: string;
  disabled?: boolean;
  checked?: boolean;
  [key: string]: any;
}

export interface OptionGroupModel<T = string> {
  value: T;
  options: OptionModel[];
}

export interface OptionGroupLabel {
  label: string;
  key: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: OptionModel<any>[] | null = [];
  @Input() disabled = false;
  @Input() multiple = false;

  filteredOptions: OptionModel<any>[] | null = [];
  value!: string;

  ngOnInit() {
    this.filteredOptions = this.options;
  }
  onChange(event: any): void {
    if (this._onChange) {
      this._onChange(event);
    }
  }

  _onChange!: (_: any) => void;
  _onTouched!: (_: any) => void;
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
