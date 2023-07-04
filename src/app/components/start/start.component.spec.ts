import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { mobileRoutes, desktopRoutes } from 'src/app/app-routing.module';
import { WordService } from 'src/app/services/word.service';
import { StackComponent } from '../stack/stack.component';
import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

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
      declarations: [StackComponent, StartComponent],
      providers: [WordService],
    }).compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const list = fixture.debugElement.query(By.css('.list'));

    list.triggerEventHandler('scroll', null);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      //const message = fixture.debugElement.query(By.css('p'));
      //expect(message.styles.color).toEqual('blue');
    });
  });
});
