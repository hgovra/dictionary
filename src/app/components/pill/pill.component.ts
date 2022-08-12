import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {

  @Input()
  content!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
