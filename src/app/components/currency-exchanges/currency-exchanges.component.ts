import { Component, OnInit, isDevMode } from '@angular/core';
import { CurrencyExchangesService } from '../../services/currency-exchanges.service';
import { CurrencyExchange } from '../../models/currency-exchange';

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
  imgExt = '.svg';

  constructor(
    public _currencyexchangeService: CurrencyExchangesService
  ) {
    if (isDevMode()) {
      this.imgPath = '../../../assets/flag-img/1x1/';
      // this.imgPath = '../../../assets/flag-img/1x1/';
    }
  }

  ngOnInit() {
    this.getCurrencyExchanges();
  }

  getCurrencyExchanges() {
    this._currencyexchangeService.getCurrencyExchanges()
    .subscribe(res => {
      this._currencyexchangeService.currencyExchanges = res as CurrencyExchange[];
    });

  }
}
