import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddBookComponent } from './request-add-book.component';

describe('RequestAddBookComponent', () => {
  let component: RequestAddBookComponent;
  let fixture: ComponentFixture<RequestAddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
