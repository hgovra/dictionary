import { Component, OnInit } from '@angular/core';
import { faArrowsRotate, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

import wordList from 'word-list-json';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cache = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as CacheStorage;

  list: string[] = [];

  words: string[] = [];
  moreWords: string[] = [];
  history: string[] = [];
  favorites: string[] = [];

  nav = 0;
  tabs = ['List', 'History', 'Favorites'];

  // Ícone da UI
  book = faBookBookmark;
  refresh = faArrowsRotate;

  constructor() { }

  ngOnInit(): void {
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
    }

    if (!this.words.length) this.updateWordList();

    this.changeTab(this.nav);
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

  resetWordList():void {
    this.words = [];

    this.updateWordList();
  }
}
