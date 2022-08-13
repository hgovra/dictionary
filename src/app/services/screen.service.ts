import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    ngZone: NgZone
  ) {
    window.onresize = e => {
      ngZone.run(() => {
        this.width.next(window.innerWidth);
      });
    };
  }

  width: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
}
