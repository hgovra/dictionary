import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

// Páginas
import { ListComponent } from './pages/mobile/list/list.component';
import { WordComponent } from './pages/mobile/word/word.component';
import { DesktopComponent } from './pages/desktop/desktop.component';

// Componentes
import { BannerComponent } from './components/banner/banner.component';
import { StackComponent } from './components/stack/stack.component';
import { StartComponent } from './components/start/start.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FailureComponent } from './components/failure/failure.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    WordComponent,
    BannerComponent,
    StackComponent,
    DesktopComponent,
    StartComponent,
    TabsComponent,
    FailureComponent,
    LoadingComponent,
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
