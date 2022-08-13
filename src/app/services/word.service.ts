import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import wordList from 'word-list-json';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  isLoading = true;
  cache: CacheStorage = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as CacheStorage;

  list: string[] = [];

  words: string[] = [];
  moreWords: string[] = [];
  history: string[] = [];
  favorites: string[] = [];
  requested: Word[] = [];

  request: string | null = null;

  word: Word | null = null;

  tabs = ['List', 'History', 'Favorites'];

  messageConnectFail = {
    title: 'No Internect connection',
    message: 'We were unable to connect to the server.',
    resolution: 'Check your connection and try again.'
  };
  messageNotFound = {
    title: 'No Definitions Found',
    message: 'Sorry pal, we couldn\'t find definitions for the word you were looking for.',
    resolution: 'You can try the search again at later time or head to the web instead.'
  };

  failure: Fail | null = null;

  nav = 0;

  favved = false;

  constructor(
    private http: HttpClient,
  ) {
    if (!this.cache) {
      let emptyCache = {
        nav: 0,
        list: [],
        history: [],
        favorites: [],
        requested: []
      }

      this.cache = emptyCache as unknown as CacheStorage;

      if (!this.words.length) this.updateWordList();

      this.saveCache();
    } else {
      this.nav = this.cache.nav;
      this.words = this.cache.list;
      this.history = this.cache.history;
      this.favorites = this.cache.favorites;
      this.requested = this.cache.requested;
    }

    this.changeTab(this.nav);
  }

  saveCache(): void {
    let updatedCache = {
      nav: this.nav,
      list: this.words,
      history: this.history,
      favorites: this.favorites,
      requested: this.requested
    }

    localStorage.setItem(`dictionary-cache`, JSON.stringify(updatedCache));
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

  resetWordList(): void {
    this.words = [];

    this.updateWordList();
  }

  getWord(word: string) {
    return this.http.get<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  }

  requestWord(request: string): void {
    this.getWord(request)
      .subscribe({
        next: res => {
          this.word = res[0];

          this.requested.push(this.word);

          this.saveCache();
        },
        error: fail => {
          if (fail.status === 0) {
            this.failure = this.messageConnectFail;
          } else {
            this.failure = fail.error;

            let notFound = {
              connect: true,
              word: request
            }

            this.cache.requested.unshift(notFound);
          }
        }
      });
  }

  getWordDetails() {
    this.isLoading = true;
    this.word = null;
    this.failure = null;

    //this.active = 0;

    let request = this.request as string;

    let historyIndex = this.history.indexOf(request);

    if (historyIndex === -1) {
      this.history.unshift(request);

      this.requestWord(request);
    } else {
      let wordIndex = this.cache.requested.findIndex(x => request === x.word);

      if (this.cache.requested[wordIndex]?.meanings) {
        this.word = this.cache.requested[wordIndex];
      } else {
        this.failure = this.messageNotFound;
      }

      this.history.splice(historyIndex, 1);
      this.history.unshift(request);
    }

    this.saveCache();

    this.isLoading = false;
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

    this.saveCache();

    this.favved = true;
  }

  removeFavorite(): void {
    let request = this.request as string;

    let favoriteIndex = this.favorites.indexOf(request);

    this.favorites.splice(favoriteIndex, 1);

    this.saveCache();

    this.favved = false;
  }
}
