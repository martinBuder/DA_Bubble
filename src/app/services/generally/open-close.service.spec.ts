import { TestBed } from '@angular/core/testing';

import { OpenCloseService } from './open-close.service';

describe('OpenCloseService', () => {
  let service: OpenCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
