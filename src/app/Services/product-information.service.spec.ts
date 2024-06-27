import { TestBed } from '@angular/core/testing';

import { ProductInformationService } from './product-information.service';

describe('ProductInformationService', () => {
  let service: ProductInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
