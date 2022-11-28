import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuedComponent } from './view-issued.component';

describe('ViewIssuedComponent', () => {
  let component: ViewIssuedComponent;
  let fixture: ComponentFixture<ViewIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIssuedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
