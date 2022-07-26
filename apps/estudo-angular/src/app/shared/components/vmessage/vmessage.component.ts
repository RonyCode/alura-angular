import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vmessage',
  templateUrl: './vmessage.component.html',
  styleUrls: ['./vmessage.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VmessageComponent implements OnInit {
  @Input() text = '';

  constructor() {}

  ngOnInit(): void {}
}
