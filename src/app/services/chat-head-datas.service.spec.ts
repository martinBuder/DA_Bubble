import { TestBed } from '@angular/core/testing';

import { ChatHeadDatasService } from './chat-head-datas.service';

describe('ChatHeadDatasService', () => {
  let service: ChatHeadDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatHeadDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
