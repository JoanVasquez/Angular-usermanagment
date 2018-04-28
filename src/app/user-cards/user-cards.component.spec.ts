import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatatableComponent } from './user-cards.component';

describe('UserDatatableComponent', () => {
  let component: UserDatatableComponent;
  let fixture: ComponentFixture<UserDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
