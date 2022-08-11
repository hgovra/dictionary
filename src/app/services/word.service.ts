import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private http: HttpClient,
  ) { }

  getWordDetails(word: string) {
    return this.http.get<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  }
}
