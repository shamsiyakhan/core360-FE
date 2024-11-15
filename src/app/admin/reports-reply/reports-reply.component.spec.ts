import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsReplyComponent } from './reports-reply.component';

describe('ReportsReplyComponent', () => {
  let component: ReportsReplyComponent;
  let fixture: ComponentFixture<ReportsReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsReplyComponent]
    });
    fixture = TestBed.createComponent(ReportsReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
