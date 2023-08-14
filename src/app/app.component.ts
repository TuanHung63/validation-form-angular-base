import { Component, OnInit } from '@angular/core';
import * as flowbite from 'flowbite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    flowbite.initFlowbite();
  }
}
