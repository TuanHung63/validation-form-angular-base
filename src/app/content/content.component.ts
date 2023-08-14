import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OptionModel } from '../select/select.component';
import { IColumnConfig } from '../table/table.component';
import { ValidatorUtil } from '../utils/validator.util';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  form!: FormGroup;
options: OptionModel<string>[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
];
columns: IColumnConfig[] = [
  {
    key: 'code',
    header: 'Code',
    widthCol:'100px'
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'color',
    header: 'Color',
  },
  {
    key: 'category',
    header: 'Category',
  },
  {
    key: 'price',
    header: 'Price',
  },
];

items = [
  {
    code: 'CODE1',
    name: `Apple MacBook Pro 17"`,
    color: `Silver`,
    category: 'Laptop',
    price: '$2999',
  },
  {
    code: 'CODE1a',
    name: `Microsoft Surface Pro`,
    color: `Silver`,
    category: 'Laptop',
    price: '$2999',
  },
  {
    code: 'CODE1z',
    name: `Magic Mouse 2`,
    color: `Silver`,
    category: 'Laptop',
    price: '$2999',
  },
  {
    code: 'CODE1b',
    name: `Apple Watch`,
    color: `Silver`,
    category: 'Laptop',
    price: '$2999',
  },
  {
    code: 'CODE1d',
    name: `Apple iMac`,
    color: `Silver`,
    category: 'Laptop',
    price: '$2999',
  },
];
// @HostListener('window:resize', ['$event'])
// getScreenSize(event : any) {
//   console.log(event);

//       // this.scrHeight = ;
//       // this.scrWidth =
//       console.log(window.innerHeight, window.innerWidth);
// }
constructor(private formBuilder: FormBuilder) {
}
ngOnInit() {
  this.form = this.formBuilder.group(
    {
      name: ['', [ValidatorUtil.required(), ValidatorUtil.maxLength(5)]],
      code: ['', [ValidatorUtil.required(), ValidatorUtil.maxLength(5)]],
      option: [],
    }
    // Uncomment to test `registerOnTouched`
    // { validator: { updateOn: 'blur' } }
  );
}
onShowForm() {}
}
