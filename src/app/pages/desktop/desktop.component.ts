import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {
  faAngleLeft,
  faAngleRight,
  faArrowsRotate,
  faBookBookmark,
  faL,
  faSadTear,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as offStar } from '@fortawesome/free-regular-svg-icons';

import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit {
  // Ícones da UI
  book = faBookBookmark;
  on = faStar;
  off = offStar;
  previous = faAngleLeft;
  next = faAngleRight;
  sad = faSadTear;

  constructor(
    public wordService: WordService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.wordService.word = null;
    this.wordService.failure = null;

    // Atualizar os dados na tela com a palavra selecionada
    this.route.params.subscribe((params) => {
      let request = params['word'] as string;
      this.wordService.request = request;

      // Carregar os dados da palavra (API ou localStorage)
      if (this.wordService.request) this.wordService.getWordDetails();

      // É favoritada ou não?
      let indexFavved = this.wordService.favorites.indexOf(request);

      this.wordService.favved = indexFavved > -1 ? true : false;

      // Atualizar o título na aba do navegador
      const newtitle = this.wordService.request
        ? 'Dictionary — ' + request
        : 'Dictionary';

      this.titleService.setTitle(newtitle);
    });
  }
}
