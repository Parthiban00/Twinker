import { TestBed } from '@angular/core/testing';

import { DeliveryBoyService } from './delivery-boy.service';

describe('DeliveryBoyService', () => {
  let service: DeliveryBoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryBoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
