import { TestBed } from '@angular/core/testing';

import { ConfirmationDialogService } from './confirmation.dialog.service';

describe('Confirmation.DialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationDialogService = TestBed.get(ConfirmationDialogService);
    expect(service).toBeTruthy();
  });
});
