import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWebUserComponent } from './new-web-user.component';

describe('NewWebUserComponent', () => {
  let component: NewWebUserComponent;
  let fixture: ComponentFixture<NewWebUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWebUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWebUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
