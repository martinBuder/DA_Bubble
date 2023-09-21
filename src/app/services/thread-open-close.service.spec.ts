import { TestBed } from '@angular/core/testing';

import { ThreadOpenCloseService } from './thread-open-close.service';

describe('ThreadOpenCloseService', () => {
  let service: ThreadOpenCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadOpenCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
