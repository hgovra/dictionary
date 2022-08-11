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

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService
  ) { }

  ngOnInit(): void {
    this.request = this.route.snapshot.params['word'];

    this.getWordDetails();
  }

  getWordDetails() {
    this.wordService.getWordDetails(this.request as string)
      .subscribe({
        next: res => {
          this.word = { ...res[0] }; console.log(this.word)
        },
        error: () => {

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
