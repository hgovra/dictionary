import { Component, OnInit } from '@angular/core';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // Ícone da UI
  book = faBookBookmark;

  constructor() { }

  ngOnInit(): void {

  }
}
