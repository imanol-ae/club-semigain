import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerReservesInPlayerComponent } from './player-reserves-in-player.component';

describe('PlayerReservesInPlayerComponent', () => {
  let component: PlayerReservesInPlayerComponent;
  let fixture: ComponentFixture<PlayerReservesInPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerReservesInPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerReservesInPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
