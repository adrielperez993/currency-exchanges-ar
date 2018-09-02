import { Component, OnInit, isDevMode } from '@angular/core';
import { CurrencyExchangesService } from '../../services/currency-exchanges.service';
import { CurrencyExchange, CurrencyExchangeFull } from '../../models/currency-exchange';
import { CURRENCY_NAMES } from '../../constants/currency-names';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-currency-exchanges',
  templateUrl: './currency-exchanges.component.html',
  styleUrls: ['./currency-exchanges.component.scss'],
  providers: [ CurrencyExchangesService ],
})
export class CurrencyExchangesComponent implements OnInit {

  currency =  '';
  // Para prod funciona este path
  imgPath = './assets/flag-img/1x1/';
  sitesImgPath = './assets/sites-img/';
  imgExt = '.svg';
  sitesImgExt = '.jpg';
  resourceLoaded = false;
  spinner = { color: 'primary', mode: 'indeterminate', value: 50 };
  isList = true;

  currencyExchangeFullList: CurrencyExchangeFull[] = [];

  constructor(
    updates: SwUpdate,
    public _currencyexchangeService: CurrencyExchangesService
  ) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });

    if (isDevMode()) {
      this.imgPath = '../../../assets/flag-img/1x1/';
      this.sitesImgPath = '../../../assets/sites-img/';
    }
  }

  ngOnInit() {
    this.getCurrencyExchanges();
  }

  getCurrencyExchanges() {
    this._currencyexchangeService.getCurrencyExchanges()
    .subscribe(res => {
      this._currencyexchangeService.currencyExchanges = res as CurrencyExchange[];
      this.getCurrencyExchangesNames(res);
      this.resourceLoaded = true;
    });
  }

  getCurrencyExchangesNames(currencyExchanges: CurrencyExchange[]): CurrencyExchangeFull[] {
    currencyExchanges.forEach(currencyExchange => {
      CURRENCY_NAMES.forEach(cn => {
        if (currencyExchange.Currency === cn.Key) {
          const newCurrencyExchangeFull: CurrencyExchangeFull = {
            Id: currencyExchange.Id,
            Currency: currencyExchange.Currency,
            Name: cn.Value,
            Date: currencyExchange.Date,
            Exchange: currencyExchange.Exchange,
          };
          this.currencyExchangeFullList.push(newCurrencyExchangeFull);
        }
      });
    });

    return this.currencyExchangeFullList;
  }

  setViewList() {
    this.isList = !this.isList;
  }
}
