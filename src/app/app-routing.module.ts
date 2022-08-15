import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { debounceTime, distinctUntilChanged } from "rxjs";

import { ScreenService } from './services/screen.service';

import { ListComponent } from './pages/mobile/list/list.component';
import { WordComponent } from './pages/mobile/word/word.component';
import { DesktopComponent } from './pages/desktop/desktop.component';

// Responsividade
export const mobileRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: ':word', component: WordComponent },
];

export const desktopRoutes: Routes = [
  { path: '', component: DesktopComponent },
  { path: ':word', component: DesktopComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(mobileRoutes),
    RouterModule.forRoot(desktopRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  MOBILE_WIDTH = 830;

  constructor(
    router: Router,
    screenService: ScreenService
  ) {
    // Escolher componente com base na largura da tela
    screenService.width.pipe(distinctUntilChanged(), debounceTime(50)).subscribe(width => {
      if (width < this.MOBILE_WIDTH) {
        router.resetConfig(mobileRoutes);
      } else {
        router.resetConfig(desktopRoutes);
      }

      router.navigate([router.url]);
    });
  }
}
