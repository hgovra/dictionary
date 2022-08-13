import { Component, Input, OnChanges, OnInit, } from '@angular/core';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {

  @Input()
  tabs: Meanings[] = [];

  active = 0;
  selected = 0;

  // Ícones da UI
  previous = faAngleLeft;
  next = faAngleRight;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.active = 0;
    this.selected = 0;
  }
}
