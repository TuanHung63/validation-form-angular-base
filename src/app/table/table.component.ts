import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
export interface IColumnConfig {
  key: string;
  header: string;
  pipe?: string;
  templateColumn?: TemplateRef<any>;
  widthCol?: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
})
export class TableComponent implements OnChanges, OnInit {
  @Input() showCheckbox: boolean = false;
  @Input() disableAllCheck: boolean = false;
  @Input() items: any[] = [];
  @Input() columns: IColumnConfig[] = [];

  // no Input decorator
  displayedColumns: IColumnConfig[] = [];

  constructor() {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
  }

}
