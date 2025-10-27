import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnEmpty } from './column-empty';

describe('ColumnEmpty', () => {
  let component: ColumnEmpty;
  let fixture: ComponentFixture<ColumnEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnEmpty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnEmpty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
