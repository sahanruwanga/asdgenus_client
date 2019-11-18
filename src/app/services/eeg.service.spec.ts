import { TestBed } from '@angular/core/testing';

import { EegService } from './eeg.service';

describe('EegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EegService = TestBed.get(EegService);
    expect(service).toBeTruthy();
  });
});
