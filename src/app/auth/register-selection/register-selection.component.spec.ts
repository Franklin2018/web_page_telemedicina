import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSelectionComponent } from './register-selection.component';

describe('RegisterSelectionComponent', () => {
  let component: RegisterSelectionComponent;
  let fixture: ComponentFixture<RegisterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
