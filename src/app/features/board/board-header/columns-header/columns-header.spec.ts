import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsHeader } from './columns-header';

describe('ColumnsHeader', () => {
  let component: ColumnsHeader;
  let fixture: ComponentFixture<ColumnsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
