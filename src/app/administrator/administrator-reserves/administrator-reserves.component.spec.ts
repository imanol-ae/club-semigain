import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorReservesComponent } from './administrator-reserves.component';

describe('AdministratorReservesComponent', () => {
  let component: AdministratorReservesComponent;
  let fixture: ComponentFixture<AdministratorReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorReservesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
