import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input()
  cards: Phonetics[] = [];

  selected = 0;

  constructor() { }

  ngOnInit(): void {
    this.selected = 0;
  }

}
