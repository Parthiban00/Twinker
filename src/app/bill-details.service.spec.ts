import { TestBed } from '@angular/core/testing';

import { BillDetailsService } from './bill-details.service';

describe('BillDetailsService', () => {
  let service: BillDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
