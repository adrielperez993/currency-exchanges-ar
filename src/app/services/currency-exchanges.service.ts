import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyExchange } from '../models/currency-exchange';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const URL_API = 'https://api.juantoselli.com/api/currencyExchange/all';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangesService {

  private cache: Observable<CurrencyExchange[]>;
  currencyExchanges: CurrencyExchange[];
  constructor(private _http: HttpClient) { }

  // getCurrencyExchanges(): Observable<CurrencyExchange[]> {
  //   return this._http.get<CurrencyExchange[]>(URL_API, HTTP_OPTIONS);
  // }

  getCurrencyExchanges(): Observable<CurrencyExchange[]> {
    if (!this.cache) {
      this.cache = this.requestCurrencyExchanges().pipe(
        shareReplay()
      );
    }
    return this.cache;
  }

  private requestCurrencyExchanges(): Observable<CurrencyExchange[]> {
    return this._http.get<CurrencyExchange[]>(URL_API, HTTP_OPTIONS).pipe
      (map(res => res)
    );
  }
}
