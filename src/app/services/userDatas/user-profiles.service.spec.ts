import { TestBed } from '@angular/core/testing';

import { UserProfilesService } from './user-profiles.service';

describe('UserProfilsService', () => {
  let service: UserProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
