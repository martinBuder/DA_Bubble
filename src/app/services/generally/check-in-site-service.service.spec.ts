import { TestBed } from '@angular/core/testing';

import { CheckInSiteServiceService } from './check-in-site-service.service';

describe('CheckInSiteServiceService', () => {
  let service: CheckInSiteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInSiteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
