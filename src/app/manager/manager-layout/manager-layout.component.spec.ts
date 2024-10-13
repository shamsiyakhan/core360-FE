import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLayoutComponent } from './manager-layout.component';

describe('ManagerLayoutComponent', () => {
  let component: ManagerLayoutComponent;
  let fixture: ComponentFixture<ManagerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerLayoutComponent]
    });
    fixture = TestBed.createComponent(ManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
