import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataPlayerComponent } from './personal-data-player.component';

describe('PersonalDataPlayerComponent', () => {
  let component: PersonalDataPlayerComponent;
  let fixture: ComponentFixture<PersonalDataPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
