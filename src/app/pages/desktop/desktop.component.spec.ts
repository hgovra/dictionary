import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mobileRoutes, desktopRoutes } from 'src/app/app-routing.module';
import { WordService } from 'src/app/services/word.service';
import { DesktopComponent } from './desktop.component';
import { StartComponent } from 'src/app/components/start/start.component';
import { StackComponent } from 'src/app/components/stack/stack.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
        InfiniteScrollModule,
      ],
      declarations: [StackComponent, StartComponent, DesktopComponent],
      providers: [WordService],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('mostrar o logo do Dictionary', () => {
    const fixture = TestBed.createComponent(DesktopComponent);

    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector(
      'h1'
    )?.textContent;

    expect(header).toContain('Dictionary');
  });
});
