import { TestBed } from '@angular/core/testing';

import { FacialDetectionService } from './facial-detection.service';

describe('FacialDetectionService', () => {
  let service: FacialDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacialDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
