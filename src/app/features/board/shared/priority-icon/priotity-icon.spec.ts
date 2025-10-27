import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriotityIcon } from './priotity-icon';

describe('PriotityIcon', () => {
  let component: PriotityIcon;
  let fixture: ComponentFixture<PriotityIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriotityIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriotityIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
