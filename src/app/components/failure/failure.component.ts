import { Component, Input, OnInit } from '@angular/core';
import { faBookBookmark, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  @Input()
  header = false;

  // Ícones da UI
  book = faBookBookmark;
  sad = faSadTear;

  constructor(
    public wordService: WordService,
  ) { }

  ngOnInit(): void {
  }

}
