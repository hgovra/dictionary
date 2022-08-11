import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { WordComponent } from './pages/word/word.component';

const routes: Routes = [
  { path: 'word-list', component: ListComponent },
  { path: 'word/:word', component: WordComponent },
  { path: '',   redirectTo: '/word-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
