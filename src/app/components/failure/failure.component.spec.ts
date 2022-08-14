import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mobileRoutes, desktopRoutes } from 'src/app/app-routing.module';
import { WordComponent } from 'src/app/pages/mobile/word/word.component';
import { WordService } from 'src/app/services/word.service';

import { FailureComponent } from './failure.component';

describe('FailureComponent', () => {
  let host: WordComponent;
  let hostFixture: ComponentFixture<WordComponent>;
  let component: FailureComponent;
  let fixture: ComponentFixture<FailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(mobileRoutes),
        RouterTestingModule.withRoutes(desktopRoutes),
        FontAwesomeModule,
      ],
      declarations: [
        WordComponent,
        FailureComponent,
      ],
      providers: [
        WordService
      ],
    })
    .compileComponents();

    hostFixture = TestBed.createComponent(WordComponent);
    host = hostFixture.componentInstance;
    fixture = TestBed.createComponent(FailureComponent);
    component = fixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });
});
