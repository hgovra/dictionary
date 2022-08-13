import { Component, Input, OnInit } from '@angular/core';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  // Ícones da UI
  refresh = faArrowsRotate;

  constructor(
    public wordService: WordService,
  ) { }

  ngOnInit(): void {
  }

  // Invoca a função de carregar mais palavras para gerar a rolagem infinita
  onScroll(): void {
    if (this.wordService.nav === 0) this.wordService.updateWordList();
  }
}
