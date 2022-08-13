import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {

  @Input()
  content: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
