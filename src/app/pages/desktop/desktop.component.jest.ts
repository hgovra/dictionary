import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { DesktopComponent } from './desktop.component';

import { WordService } from '../../services/word.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { mobileRoutes, desktopRoutes } from '../../app-routing.module';
import { StackComponent } from '../../components/stack/stack.component';
import { StartComponent } from '../../components/start/start.component';

import wordList from 'word-list-json';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      RouterTestingModule.withRoutes(mobileRoutes),
      RouterTestingModule.withRoutes(desktopRoutes),
      FontAwesomeModule,
      InfiniteScrollModule,
    ],
    declarations: [StackComponent, StartComponent, DesktopComponent],
    providers: [WordService],
  });
});

it('mostrar o logo do Dictionary', async () => {
  await render(DesktopComponent);

  const header = screen.getByRole('heading', { name: 'Dictionary' });

  expect(header).toBeInTheDocument();
});
