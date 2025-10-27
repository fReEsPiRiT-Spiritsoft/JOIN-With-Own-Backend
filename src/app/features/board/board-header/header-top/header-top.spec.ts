import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTop } from './header-top';

describe('HeaderTop', () => {
  let component: HeaderTop;
  let fixture: ComponentFixture<HeaderTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
