import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { faAngleLeft, faAngleRight, faArrowsRotate, faBookBookmark, faSadTear, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as offStar } from '@fortawesome/free-regular-svg-icons';

import wordList from 'word-list-json';
import { WordService } from 'src/app/services/word.service';
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  cache: CacheStorage = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as CacheStorage;

  list: string[] = [];

  words: string[] = [];
  moreWords: string[] = [];
  history: string[] = [];
  favorites: string[] = [];
  requested: Word[] = [];

  request: string | null = null;

  word: Word | null = null;
  failure: Fail | null = null;

  nav = 0;
  tabs = ['List', 'History', 'Favorites'];

  active = 0;
  selected = 0;

  favved = false;

  // Ícones da UI
  book = faBookBookmark;
  refresh = faArrowsRotate;
  on = faStar;
  off = offStar;
  previous = faAngleLeft;
  next = faAngleRight;
  sad = faSadTear;
  
  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private titleService: Title
  ) { }

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
      this.nav = this.cache.nav;
      this.words = this.cache.list;
      this.history = this.cache.history;
      this.favorites = this.cache.favorites;
      this.requested = this.cache.requested;
    }

    if (!this.words.length) this.updateWordList();

    this.changeTab(this.nav);

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

          if (this.request) this.getWordDetails();
        }
      );

    if (this.request) {
      this.titleService.setTitle('Dictionary — ' + this.request as string);
    } else {
      this.titleService.setTitle('Dictionary');
    }
  }

  saveCache(): void {
    let updatedCache = {
      ...this.cache,
      nav: this.nav,
      list: this.words
    }

    localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));
  }

  get randomWord(): string {
    const index = Math.floor(Math.random() * wordList.length);

    return wordList[index];
  }

  updateWordList(): void {
    this.getMoreWords();

    this.words = [... this.words, ...this.moreWords];
    this.list = [...this.words];

    this.saveCache();
  }

  getMoreWords(amount = 120): void {
    this.moreWords = [];

    for (let i = 0; i < amount; i++) {
      let newWord = this.randomWord;

      if (this.words.indexOf(newWord) < 0) this.moreWords.push(newWord);
    }
  }

  changeTab(tab: number): void {
    this.nav = tab;

    if (tab === 0) {
      this.list = this.words;
    } else if (tab === 1) {
      this.list = this.history;
    } else if (tab === 2) {
      this.list = this.favorites;
    }

    this.saveCache();
  }

  onScroll(): void {
    if (this.nav === 0) this.updateWordList();
  }

  resetWordList(): void {
    this.words = [];

    this.updateWordList();
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
