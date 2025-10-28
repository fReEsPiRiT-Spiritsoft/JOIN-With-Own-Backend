import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskModal } from './show-task-modal';

describe('ShowTaskModal', () => {
  let component: ShowTaskModal;
  let fixture: ComponentFixture<ShowTaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTaskModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTaskModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
