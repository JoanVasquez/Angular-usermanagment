import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigninFormComponent } from './user-signin-form.component';

describe('UserSigninFormComponent', () => {
  let component: UserSigninFormComponent;
  let fixture: ComponentFixture<UserSigninFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSigninFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
