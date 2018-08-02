import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CurrencyExchange } from '../models/currency-exchange';

@Pipe({
  name: 'currencySearch'
})
@Injectable()
export class CurrencySearchPipe implements PipeTransform {

  transform(currencies: CurrencyExchange[], args: string): CurrencyExchange[] {
    if (!currencies) { return []; }
    return currencies.filter(currency => currency.Currency.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }

}
