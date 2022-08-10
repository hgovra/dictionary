import { Component } from '@angular/core';

import wordList from 'word-list-json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dictionary';

  get randomWord(): string {
    const index = Math.floor(Math.random() * wordList.length);
    
    return wordList[index];
  }

  words: string[] = [];

  generateWordList(amount = 12) {
    for(let i = 0; i < amount; i++) {
      this.words.push(this.randomWord);
    }
  }

  ngOnInit() {
    
    this.generateWordList();
      console.log(this.words);
    //});
  }
}
