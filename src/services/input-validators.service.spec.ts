import { TestBed } from '@angular/core/testing';

import { InputValidatorsService } from './input-validators.service';

describe('InputValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputValidatorsService = TestBed.get(InputValidatorsService);
    expect(service).toBeTruthy();
  });
});
