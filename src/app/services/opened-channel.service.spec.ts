import { TestBed } from '@angular/core/testing';

import { OpenedChannelService } from './opened-channel.service';

describe('OpenedChannelService', () => {
  let service: OpenedChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenedChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
