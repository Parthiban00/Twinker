import { TestBed } from '@angular/core/testing';

import { OtpVerificationService } from './otp-verification.service';

describe('OtpVerificationService', () => {
  let service: OtpVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
