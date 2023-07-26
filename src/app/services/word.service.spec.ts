import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WordService } from './word.service';

import { desktopRoutes, mobileRoutes } from '../app-routing.module';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(mobileRoutes),
        RouterTestingModule.withRoutes(desktopRoutes),
      ],
    });

    service = TestBed.inject(WordService);
  });

  it('carregar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
