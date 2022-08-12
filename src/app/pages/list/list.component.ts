import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

import wordList from 'word-list-json';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cache = localStorage.getItem('dictionary-cache');

  words: string[] = [];
  moreWords: string[] = [];

  constructor(
    private wordService: WordService
  ) { }

  ngOnInit(): void {
    this.updateWordList();

    if(!this.cache) {
      const emptyCache = {
        list: [],
        requested: []
      }
    }
  }

  get randomWord(): string {
    const index = Math.floor(Math.random() * wordList.length);

    return wordList[index];
  }

  updateWordList(): void {
    this.getMoreWords();

    this.words = [... this.words, ...this.moreWords];
  }

  getMoreWords(amount = 60): void {
    this.moreWords = [];

    for (let i = 0; i < amount; i++) {
      let newWord = this.randomWord;

      this.moreWords.push(newWord);
    }
  }

  onScroll(): void {
    this.updateWordList();
  }
}
