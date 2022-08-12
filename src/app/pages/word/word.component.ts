import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  cache: Cache = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as Cache;
  request: string | null = null;

  word: Word | null = null;
  failure: Fail | null = null;

  active = 0;
  selected = 0;

  // Ícones da UI
  previous = faAngleLeft;
  next = faAngleRight;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService
  ) { }

  ngOnInit(): void {
    if (!this.cache) {
      let emptyCache = {
        list: [],
        requested: []
      }

      localStorage.setItem(`dictionary-cache`, JSON.stringify(emptyCache));
    }

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

    this.active = 0;

    this.wordService.getWord(this.request as string)
      .subscribe({
        next: res => {
          if (this.cache) {
            let index = this.cache.requested.findIndex(x => x.word === this.request);

            if (index > -1) {
              this.word = this.cache.requested[index];

              return;
            }
          }

          this.word = res[0];

          let updatedRequested = this.cache.requested;
          updatedRequested.push(this.word);

          let updatedCache = {
            list: [...this.cache.list],
            requested: updatedRequested
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
}
