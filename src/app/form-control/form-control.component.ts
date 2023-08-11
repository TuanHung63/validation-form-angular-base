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

  constructor(
    private elRef: ElementRef,
    // private ngControl: NgControl,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.content!.statusChanges!.subscribe((status) => {
      if (status === 'INVALID') {
        this.showError(this.content?.control!.errors!['message']);
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
