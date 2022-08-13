import { Component, OnInit } from '@angular/core';
import { faArrowsRotate, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

import wordList from 'word-list-json';

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
