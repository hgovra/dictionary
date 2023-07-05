import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Plugins

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Páginas

import { ListComponent } from './pages/mobile/list/list.component';
import { WordComponent } from './pages/mobile/word/word.component';
import { DesktopComponent } from './pages/desktop/desktop.component';

// Componentes

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { StackComponent } from './components/stack/stack.component';
import { StartComponent } from './components/start/start.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FailureComponent } from './components/failure/failure.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    StackComponent,
    StartComponent,
    TabsComponent,
    FailureComponent,
    LoadingComponent,
    ListComponent,
    WordComponent,
    DesktopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
