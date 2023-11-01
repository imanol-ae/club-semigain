import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerReservesComponent } from './player-reserves.component';

describe('PlayerReservesComponent', () => {
  let component: PlayerReservesComponent;
  let fixture: ComponentFixture<PlayerReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerReservesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
