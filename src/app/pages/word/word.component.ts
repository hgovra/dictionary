import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  request: string | null = null;

  word: Word | null = null;
  failure: Fail | null = null;

  active = 0;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => {
          this.request = params['word'];

          this.getWordDetails();
        }
      );
  }

  getWordDetails() {
    this.word = null;
    this.failure = null;

    this.wordService.getWord(this.request as string)
      .subscribe({
        next: res => {
          this.word = res[0];
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
}
