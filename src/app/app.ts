import { Component } from '@angular/core';
import { RouteTableComponent } from './route-table/route-table.component';

@Component({
  selector: 'app-root',
  imports: [RouteTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
