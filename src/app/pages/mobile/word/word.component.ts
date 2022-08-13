import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight, faBookBookmark, faSadTear, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as offStar } from '@fortawesome/free-regular-svg-icons';

import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  cache: CacheStorage = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as CacheStorage;

  history: string[] = [];
  favorites: string[] = [];
  requested: Word[] = [];

  request: string | null = null;

  word: Word | null = null;
  failure: Fail | null = null;

  active = 0;
  selected = 0;

  favved = false;

  // Ícones da UI
  book = faBookBookmark;
  on = faStar;
  off = offStar;
  previous = faAngleLeft;
  next = faAngleRight;
  sad = faSadTear;

  //deviceHeight: any;
  //deviceWidth: any;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService
  ) {
    /*this.deviceHeight = window.screen.height;
    this.deviceWidth = window.screen.width;
    console.log(this.deviceHeight);
    console.log(this.deviceWidth)*/
  }

  ngOnInit(): void {
    this.active = 0;
    this.selected = 0;

    if (!this.cache) {
      let emptyCache = {
        nav: 0,
        list: [],
        history: [],
        favorites: [],
        requested: []
      }

      this.cache = emptyCache as unknown as CacheStorage;

      localStorage.setItem(`dictionary-cache`, JSON.stringify(emptyCache));
    } else {
      this.history = this.cache.history;
      this.favorites = this.cache.favorites;
      this.requested = this.cache.requested;
    }

    this.route.params
      .subscribe(
        params => {
          this.request = params['word'];

          let indexFavved = this.favorites.indexOf(this.request as string);

          if (indexFavved !== -1) {
            this.favved = true;
          } else {
            this.favved = false;
          }

          this.getWordDetails();
        }
      );
  }

  getWordDetails() {
    this.word = null;
    this.failure = null;

    this.active = 0;

    let request = this.request as string;

    let historyIndex = this.history.indexOf(request);

    if (historyIndex === -1) {
      this.history.unshift(request);
    } else {
      this.history.splice(historyIndex, 1);
      this.history.unshift(request);
    }

    let updatedCache = {
      ...this.cache,
      history: this.history
    }

    localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));

    this.wordService.getWord(request)
      .subscribe({
        next: res => {
          if (this.cache) {
            let index = this.cache.requested.findIndex(x => x.word === request);

            if (index > -1) {
              this.word = this.cache.requested[index];

              return;
            }
          }

          this.word = res[0];

          this.requested.push(this.word);

          let updatedCache = {
            ...this.cache,
            requested: this.requested
          }

          localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));
        },
        error: fail => {
          this.failure = fail.error;
        }
      });
  }

  playPhonetics(url?: string) {
    let audio = new Audio();
    if (url) audio.src = url;

    audio.load();
    audio.play();
  }

  saveFavorite(): void {
    let request = this.request as string;

    this.favorites.unshift(request);

    let updatedCache = {
      ...this.cache,
      favorites: this.favorites
    };

    localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));

    this.favved = true;
  }

  removeFavorite(): void {
    let request = this.request as string;

    let favoriteIndex = this.favorites.indexOf(request);

    this.favorites.splice(favoriteIndex, 1);

    let updatedCache = {
      ...this.cache,
      favorites: this.favorites
    }

    localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));

    this.favved = false;
  }
}
