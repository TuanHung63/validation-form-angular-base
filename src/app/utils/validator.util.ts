import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export class ValidatorUtil {
  static required(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value)
        ? {
            required: true,
            message: message || 'Vui lòng nhập đầy đủ thông tin',
          }
        : null;
    };
  }
  static min(min: number, message?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value < min
        ? {
            min: { min: min, actual: control.value },
            message: message || `Vui lòng nhập số lớn hơn hoặc bằng ${min}`,
          }
        : null;
    };
  }
  static max(max: number, message?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && value > max
        ? {
            max: { max: max, actual: control.value },
            message: message || `Vui lòng nhập số nhỏ hơn hoặc bằng ${max}`,
          }
        : null;
    };
  }
  static email(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      return EMAIL_REGEXP.test(control.value)
        ? null
        : {
            email: true,
            message: message || 'Vui lòng nhập đúng định dạng email',
          };
    };
  }
  static minLength(minLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }

      return control.value.length < minLength
        ? {
            minlength: {
              requiredLength: minLength,
              actualLength: control.value.length,
            },
            message: message || `Vui lòng nhập tối thiểu ${minLength} ký tự`,
          }
        : null;
    };
  }
  static maxLength(maxLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return hasValidLength(control.value) && control.value.length > maxLength
        ? {
            maxlength: {
              requiredLength: maxLength,
              actualLength: control.value.length,
            },
            message: message || `Vui lòng nhập tối đa ${maxLength} ký tự`,
          }
        : null;
    };
  }
  static pattern(pattern: string | RegExp, message?: string): ValidatorFn {
    if (!pattern) return nullValidator;
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') regexStr += '^';

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            pattern: { requiredPattern: regexStr, actualValue: value },
            message: message || `Vui lòng nhập đúng định dạng`,
          };
    };
  }
}
export function nullValidator(
  control: AbstractControl
): ValidationErrors | null {
  return null;
}
export function isEmptyInputValue(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  return (
    value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0)
  );
}

function hasValidLength(value: any): boolean {
  return value != null && typeof value.length === 'number';
}
