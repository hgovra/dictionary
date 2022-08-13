import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { faBookBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as offStar } from '@fortawesome/free-regular-svg-icons';

import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  // Ícones da UI
  book = faBookBookmark;
  on = faStar;
  off = offStar;

  constructor(
    private route: ActivatedRoute,
    public wordService: WordService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Atualizar os dados na tela com a palavra selecionada
    this.route.params
      .subscribe(
        params => {
          let request = params['word'] as string;
          this.wordService.request = request;

          // Carregar os dados da palavra (API ou localStorage)
          if (this.wordService.request) this.wordService.getWordDetails();

          // É favoritada ou não?
          let indexFavved = this.wordService.favorites.indexOf(request);

          if (indexFavved !== -1) {
            this.wordService.favved = true;
          } else {
            this.wordService.favved = false;
          }

          // Atualizar o título na aba do navegador
          if (this.wordService.request) {
            this.titleService.setTitle('Dictionary — ' + request);
          } else {
            this.titleService.setTitle('Dictionary');
          }
        }
      );
  }
}
