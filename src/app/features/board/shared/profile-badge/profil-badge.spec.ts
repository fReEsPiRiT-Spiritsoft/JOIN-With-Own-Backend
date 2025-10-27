import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBadge } from './profil-badge';

describe('ProfilBadge', () => {
  let component: ProfilBadge;
  let fixture: ComponentFixture<ProfilBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
