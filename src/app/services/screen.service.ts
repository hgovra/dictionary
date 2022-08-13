import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    ngZone: NgZone
  ) {
    // Obter largura da tela
    window.onresize = e => {
      ngZone.run(() => {
        this.width.next(window.innerWidth);
      });
    };
  }

  width: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
}
