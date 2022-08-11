import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  request: string | null = null;

  word: Word | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.request = this.route.snapshot.params['word'];

    this.getWordDetails();
  }

  getWordDetails() {
    return this.http.get<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.request as string}`)
      .subscribe({
        next: res => {
          this.word = { ...res[0] };console.log(this.word)
        },
        error: () => {

        }
      });
  }

  playPhonetics(url?: string) {
    let audio = new Audio();
    if(url) audio.src = url;

    audio.load();
    audio.play();
  }
}
