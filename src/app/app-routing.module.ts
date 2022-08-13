import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';

import { ListComponent } from './pages/mobile/list/list.component';
import { WordComponent } from './pages/mobile/word/word.component';
import { ScreenService } from './services/screen.service';

const mobileRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: ':word', component: WordComponent },
];

const desktopRoutes: Routes = [
  {
    path: '',
    component: DesktopComponent,
    children: [
      {
        path: ':word',
        component: DesktopComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(mobileRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  MOBILE_WIDTH = 830;

  constructor(
    router: Router,
    screenService: ScreenService
  ) {
    screenService.width.subscribe(width => {
      if (width < this.MOBILE_WIDTH) {
        router.resetConfig(mobileRoutes);
      } else {
        router.resetConfig(desktopRoutes);
      }
    });
  }
}
