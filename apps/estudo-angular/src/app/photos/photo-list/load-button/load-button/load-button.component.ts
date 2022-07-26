import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoadButtonComponent implements OnInit {
  @Input() hasMore: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
