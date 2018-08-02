import { TestBed, inject } from '@angular/core/testing';

import { CurrencyExchangesService } from './currency-exchanges.service';

describe('CurrencyExchangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyExchangesService]
    });
  });

  it('should be created', inject([CurrencyExchangesService], (service: CurrencyExchangesService) => {
    expect(service).toBeTruthy();
  }));
});
