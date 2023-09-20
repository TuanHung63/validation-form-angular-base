import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import {
  FormControlDirective,
  FormControlName,
  NgControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
})
export class FormControlComponent implements AfterViewInit, OnInit {
  @ContentChild(NgControl, { static: false }) content?:
    | FormControlName
    | FormControlDirective;
  isError = false;
  message: string = '';
  patternMessage: string = '';
  private errorMessages: { [key: string]: any } = {
    required: (controls: any) =>
      `${this.translate.instant('form_validation.required')}`,
    pattern: (controls: any) =>
      this.patternMessage
        ? this.patternMessage
        : `${this.translate.instant('form_validation.pattern')}`,
    email: (controls: any) =>
      `${this.translate.instant('form_validation.email')}`,
    minlength: (controls: any) =>
      `${this.translate.instant('form_validation.minlength')} ${
        controls?.requiredLength || '0'
      } ${this.translate.instant('form_validation.characters')}`,
    maxlength: (controls: any) =>
      `${this.translate.instant('form_validation.maxlength')} ${
        controls?.requiredLength || '0'
      } ${this.translate.instant('form_validation.characters')}`,
    min: (controls: any) =>
      `${this.translate.instant('form_validation.min')} ${controls?.min || 0}.`,
    max: (controls: any) =>
      `${this.translate.instant('form_validation.max')} ${controls?.max || 0}.`,
  };

  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lang: string) => {
      const key = Object.keys(this.content?.control!.errors!)[0];
      this.message = this.errorMessages[key](
        this.content?.control!.errors![key]
      );
    });
  }
  ngAfterViewInit(): void {
    this.content!.statusChanges!.subscribe((status) => {
      if (status === 'INVALID') {
        const key = Object.keys(this.content?.control!.errors!)[0];
        this.message = this.errorMessages[key](
          this.content?.control!.errors![key]
        );
        this.showError();
      } else {
        this.removeError();
      }
    });
  }
  private showError() {
    this.isError = true;
  }

  private removeError(): void {
    this.isError = false;
    this.message = '';
  }
}
