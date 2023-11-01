import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInAdminComponent } from './player-in-admin.component';

describe('PlayerInAdminComponent', () => {
  let component: PlayerInAdminComponent;
  let fixture: ComponentFixture<PlayerInAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerInAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
