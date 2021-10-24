import { TestBed } from '@angular/core/testing';

import { BuddyService } from './buddy.service';

describe('BuddyService', () => {
  let service: BuddyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuddyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
