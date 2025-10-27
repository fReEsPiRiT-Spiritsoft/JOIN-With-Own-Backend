import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProgress } from './card-progress';

describe('CardProgress', () => {
  let component: CardProgress;
  let fixture: ComponentFixture<CardProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
