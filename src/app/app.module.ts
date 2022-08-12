import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

import { ListComponent } from './pages/list/list.component';
import { WordComponent } from './pages/word/word.component';
import { BannerComponent } from './components/banner/banner.component';
import { PillComponent } from './components/pill/pill.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    WordComponent,
    BannerComponent,
    PillComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
