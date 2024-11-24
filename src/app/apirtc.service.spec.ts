import { TestBed } from '@angular/core/testing';

import { ApirtcService } from './apirtc.service';

describe('ApirtcService', () => {
  let service: ApirtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
