import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmarketingComponent } from './addmarketing.component';

describe('AddmarketingComponent', () => {
  let component: AddmarketingComponent;
  let fixture: ComponentFixture<AddmarketingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddmarketingComponent]
    });
    fixture = TestBed.createComponent(AddmarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
