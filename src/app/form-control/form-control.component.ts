import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  FormControlDirective,
  FormControlName,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
})
export class FormControlComponent {
  @ContentChild(NgControl, { static: false }) content?:
    | FormControlName
    | FormControlDirective;
  isError = false;
  message: string = '';
  private errorMessages: { [key: string]: any } = {
    required: (controls: any) => 'Vui lòng nhập đầy đủ thông tin',
    pattern: (controls: any) => 'Vui lòng nhập đúng định dạng',
    email: (controls: any) => 'Vui lòng nhập đúng định dạng Email',
    minlength: (controls: any) =>
      `
      Vui lòng nhập tối thiểu ${controls?.requiredLength || '0'} ký tự`,
    maxlength: (controls: any) =>
      `
      Vui lòng nhập tối đa ${controls?.requiredLength || '0'} ký tự`,
    min: (controls: any) =>
      `Vui lòng nhập số lớn hơn hoặc bằng ${controls?.min || 0}`,
    max: (controls: any) =>
      `Vui lòng nhập số nhỏ hơn hoặc bằng ${controls?.max || 0}`,
  };

  constructor(
    private elRef: ElementRef,
    // private ngControl: NgControl,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.content!.statusChanges!.subscribe((status) => {
      if (status === 'INVALID') {
        const key = Object.keys(this.content?.control!.errors!)[0];
        const message = this.errorMessages[key](
          this.content?.control!.errors![key]
        );
        this.showError(message);
      } else {
        this.removeError();
      }
    });
  }
  private showError(message: string) {
    this.isError = true;
    this.message = message;
  }

  private removeError(): void {
    this.isError = false;
    this.message = '';
  }
}
