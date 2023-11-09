import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatePlayersComponent } from './validate-players.component';

describe('ValidatePlayersComponent', () => {
  let component: ValidatePlayersComponent;
  let fixture: ComponentFixture<ValidatePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
