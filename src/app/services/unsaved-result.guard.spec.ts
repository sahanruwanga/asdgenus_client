import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedResultGuard } from './unsaved-result.guard';

describe('UnsavedResultGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedResultGuard]
    });
  });

  it('should ...', inject([UnsavedResultGuard], (guard: UnsavedResultGuard) => {
    expect(guard).toBeTruthy();
  }));
});
