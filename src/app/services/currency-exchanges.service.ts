import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyExchange } from '../models/currency-exchange';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangesService {

  currencyExchanges: CurrencyExchange[];
  readonly URL_API = 'https://api.juantoselli.com/api/currencyExchange/all';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  getCurrencyExchanges(): Observable<CurrencyExchange[]> {
    return this._http.get<CurrencyExchange[]>(this.URL_API, this.httpOptions);
  }
}
