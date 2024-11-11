import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingInfoComponent } from './marketing-info.component';

describe('MarketingInfoComponent', () => {
  let component: MarketingInfoComponent;
  let fixture: ComponentFixture<MarketingInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketingInfoComponent]
    });
    fixture = TestBed.createComponent(MarketingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
