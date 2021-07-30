import { TestBed } from '@angular/core/testing';

import { RestManagmentService } from './rest-managment.service';

describe('RestManagmentService', () => {
  let service: RestManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
