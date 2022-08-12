import { Component, Input, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input()
  cards: Phonetics[] = [];

  selected = 0;

  previous = faAngleLeft;
  next = faAngleRight;

  constructor() { }

  ngOnInit(): void {
    this.selected = 0;
  }

}
