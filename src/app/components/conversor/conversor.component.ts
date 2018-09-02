import { Component, OnInit, isDevMode } from '@angular/core';
import { CurrencyExchangesService } from '../../services/currency-exchanges.service';
import { CurrencyExchange, CurrencyExchangeFull } from '../../models/currency-exchange';
import { ICalculator, CalculatorAnyToARS, CalculatorAnyToAny } from '../../calculator/calculator';
import { CURRENCY_NAMES } from '../../constants/currency-names';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss'],
  providers: [ CurrencyExchangesService ]
})
export class ConversorComponent implements OnInit {

  currencyExchangeFullList: CurrencyExchangeFull[] = [{
    Id: '',
    Currency: 'ARS',
    Name: 'Peso Argentino',
    Date: new Date,
    Exchange: 1
  }];

  selectedCurrencyFrom: string;
  selectedCurrencyTo: string;
  imgPath = './assets/flag-img/1x1/';
  amount: number;
  result: number;
  _calculator: ICalculator;

  constructor(
    updates: SwUpdate,
    public _currencyexchangeService: CurrencyExchangesService
  ) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });

    if (isDevMode()) {
      this.imgPath = '../../../assets/flag-img/1x1/';
    }
  }

  ngOnInit() {
    this.getCurrencyExchanges();
    this.selectedCurrencyFrom = 'USD';
    this.selectedCurrencyTo = 'ARS';
    this.amount = 1;
    this.calculate();
  }

  getCurrencyExchanges() {
    this._currencyexchangeService.getCurrencyExchanges()
    .subscribe(res => {
      this._currencyexchangeService.currencyExchanges = res as CurrencyExchange[];
      this.getCurrencyExchangesNames(res);
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

  calculate() {
    const exchangeFrom = this.getExchangeFromCurrency(this.selectedCurrencyFrom);
    const exchangeTo = this.getExchangeFromCurrency(this.selectedCurrencyTo);
    switch (this.selectedCurrencyTo) {
      case 'ARS':
        this._calculator = new CalculatorAnyToARS(this.selectedCurrencyFrom, this.selectedCurrencyTo, this.amount, exchangeFrom);
        this.result = this._calculator.calculate();
        break;
        default:
        this._calculator = new CalculatorAnyToAny(this.selectedCurrencyFrom, this.selectedCurrencyTo,
           this.amount, exchangeFrom, exchangeTo);
        this.result = this._calculator.calculate();
        break;
    }
  }

  getExchangeFromCurrency(currency: string): number {
    let exchange = 0;
    this.currencyExchangeFullList.forEach(currencyExchange => {
      if (currencyExchange.Currency === currency) {
        exchange = currencyExchange.Exchange;
      }
    });
    return exchange;
  }

  intercambiar() {
    const currencyTemp = this.selectedCurrencyFrom;
    this.selectedCurrencyFrom = this.selectedCurrencyTo;
    this.selectedCurrencyTo = currencyTemp;
    this.calculate();
  }

  clearFields() {
    this.selectedCurrencyFrom = 'USD';
    this.selectedCurrencyTo = 'ARS';
    this.amount = 1;
    this.calculate();
  }
}
