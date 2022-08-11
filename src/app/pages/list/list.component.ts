import { Component, OnInit } from '@angular/core';

import wordList from 'word-list-json';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  words: string[] = [];
  moreWords: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.updateWordList();
  }

  get randomWord(): string {
    const index = Math.floor(Math.random() * wordList.length);

    return wordList[index];
  }

  updateWordList(): void {
    this.getMoreWords();

    this.words = [ ... this.words, ...this.moreWords ];
  }

  getMoreWords(amount = 120): void {
    this.moreWords = [];

    for (let i = 0; i < amount; i++) {
      this.moreWords.push(this.randomWord);
    }
  }

  onScroll(): void {
    this.updateWordList();
  }
}
