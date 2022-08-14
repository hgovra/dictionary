import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mobileRoutes, desktopRoutes } from 'src/app/app-routing.module';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { WordService } from 'src/app/services/word.service';

import { DesktopComponent } from './desktop.component';

describe('DesktopComponent', () => {
  let component: DesktopComponent;
  let fixture: ComponentFixture<DesktopComponent>;

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
        LoadingComponent,
      ],
      providers: [
        WordService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
