import { Component, OnInit } from '@angular/core';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  // Ícones da UI
  book = faBookBookmark;
  
  constructor() { }

  ngOnInit(): void {
  }

}
