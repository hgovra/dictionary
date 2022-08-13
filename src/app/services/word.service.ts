import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import wordList from 'word-list-json';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  isLoading = true;

  // Dados off-line
  cache: CacheStorage = JSON.parse(localStorage.getItem('dictionary-cache') as string) as unknown as CacheStorage;

  list: string[] = [];

  words: string[] = [];
  moreWords: string[] = [];
  history: string[] = [];
  favorites: string[] = [];
  requested: Word[] = [];

  // Palavra a ser consultada
  request: string | null = null;

  // Dados dinâmicos da UI
  word: Word | null = null;

  tabs = ['List', 'History', 'Favorites'];

  messageConnectFail = {
    title: 'No Internet Connection',
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
    // Se não houver cache, criar um novo
    if (!this.cache) {
      let emptyCache = {
        nav: 0,
        list: [],
        history: [],
        favorites: [],
        requested: []
      }

      this.cache = emptyCache as unknown as CacheStorage;

      // Carregar palavras se não houver nenhuma
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

  // Salvar os dados em cache (localStorage)
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

  // Controladora do estado do menu inicial
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

  // Escolher palavra aleatória
  get randomWord(): string {
    const index = Math.floor(Math.random() * wordList.length);

    return wordList[index];
  }

  // Adicionar mais palavras à lista do menu inicial na rolagem infinita
  updateWordList(): void {
    this.moreWords = [];

    for (let i = 0; i < 120; i++) {
      let newWord = this.randomWord;

      // Conferir se a palavra escolhida não é repetida
      if (this.words.indexOf(newWord) < 0) this.moreWords.push(newWord);
    }

    this.words = [... this.words, ...this.moreWords];
    this.list = [...this.words];

    this.saveCache();
  }

  // Renovar a lista de palavras
  resetWordList(): void {
    this.words = [];

    this.updateWordList();
  }

  // Consultar dados sobre a palavra na API
  getWord(word: string) {
    return this.http.get<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  }

  // Tratar dados vindos da API
  requestWord(request: string, pos?: number): void {
    // Substituir palavra existente sem dados
    const start = pos ? pos : 0;
    const count = pos ? 1 : 0;

    this.getWord(request)
      .subscribe({
        next: res => {
          this.word = res[0];

          this.requested.splice(start, count, this.word);

          this.saveCache();
        },
        error: fail => {
          if (fail.status === 0) { // Erro de conexão
            this.failure = this.messageConnectFail;

            let notFound = {
              connect: false,
              word: request
            }

            this.requested.unshift(notFound);
          } else { // Palavra não encontrada
            this.failure = fail.error;

            let notFound = {
              connect: true,
              word: request
            }

            this.requested.unshift(notFound);
          }
        }
      });
  }

  // Carregar dados da palavra e salvar no histórico
  getWordDetails() {
    this.isLoading = true;
    this.word = null;
    this.failure = null;

    let request = this.request as string;

    let historyIndex = this.history.indexOf(request);

    if (historyIndex === -1) { // Palavra nova
      this.history.unshift(request);

      this.requestWord(request);
    } else {
      let wordIndex = this.requested.findIndex(x => request === x.word);

      if (this.requested[wordIndex]?.meanings) { // Palavra salva no cache
        this.word = this.cache.requested[wordIndex];
      } else {
        if (this.requested[wordIndex]?.connect) { // Palavra não encontrada na API
          this.failure = this.messageNotFound;
        } else { // Palavra sem dados por erro de conexão
          this.requestWord(request, wordIndex);
        }
      }

      this.history.splice(historyIndex, 1);
      this.history.unshift(request);
    }

    this.saveCache();

    this.isLoading = false;
  }

  // Reproduzir áudio dos fonemas disponíveis
  playPhonetics(url?: string) {
    let audio = new Audio();
    if (url) audio.src = url;

    audio.load();
    audio.play();
  }

  // Salvar palavra favorita
  saveFavorite(): void {
    let request = this.request as string;

    this.favorites.unshift(request);

    this.saveCache();

    this.favved = true;
  }

  // Remover palavra favorita
  removeFavorite(): void {
    let request = this.request as string;

    let favoriteIndex = this.favorites.indexOf(request);

    this.favorites.splice(favoriteIndex, 1);

    this.saveCache();

    this.favved = false;
  }
}
