import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

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
    this.selected = 0;
  }

  updatePlayed(audio: HTMLAudioElement) {
    this.played = audio.currentTime / audio.duration * 100;
  }
}
