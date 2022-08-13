import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnChanges {

  @Input()
  cards: Phonetics[] = [];

  selected = 0;

  @ViewChild("sound")
  sound!: ElementRef;

  isPaused = true;
  played = 0;

  // Ícones da UI
  previous = faAngleLeft;
  next = faAngleRight;
  play = faPlay;
  pause = faPause;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.selected = 0;
  }

  // Função que atualiza o tempo de áudio
  updatePlayed(audio: HTMLAudioElement) {
    this.played = audio.currentTime / audio.duration * 100;
  }
}
