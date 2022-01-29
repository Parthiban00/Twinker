import { TestBed } from '@angular/core/testing';

import { BuddyShopService } from './buddy-shop.service';

describe('BuddyShopService', () => {
  let service: BuddyShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuddyShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
