import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionModel } from './select/select.component';
import { ValidatorUtil } from './utils/validator.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  options: OptionModel<string>[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['',[ValidatorUtil.required(),ValidatorUtil.maxLength(5)]],
        code: ['',[ValidatorUtil.required(),ValidatorUtil.maxLength(5)]],
        option: [],
      }
      // Uncomment to test `registerOnTouched`
      // { validator: { updateOn: 'blur' } }
    );
  }
  onShowForm() {}
}
