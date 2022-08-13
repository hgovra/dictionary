import { Component, OnInit } from '@angular/core';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  // Ícones da UI
  sad = faSadTear;

  constructor(
    public wordService: WordService,
  ) { }

  ngOnInit(): void {
  }

}
