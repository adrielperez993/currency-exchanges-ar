export interface ICalculator {
  CurrencyFrom: string;
  CurrencyTo: string;
  Amount: number;
  ExchangeFrom: number;
  ExchangeTo: number;
  Result: number;

  calculate(): number;
}

export class CalculatorAnyToARS implements ICalculator {
  CurrencyFrom: string;
  CurrencyTo: string;
  Amount: number;
  ExchangeFrom: number;
  ExchangeTo: number;
  Result: number;

  constructor(_currencyFrom: string, _currencyTo: string, _amount: number, _exchangeFrom: number) {
    this.CurrencyFrom = _currencyFrom;
    this.CurrencyTo = _currencyTo;
    this.Amount = _amount;
    this.ExchangeFrom = _exchangeFrom;
  }

  calculate(): number {
    this.Result = this.Amount * this.ExchangeFrom;
    return this.Result;
  }
}

export class CalculatorAnyToAny implements ICalculator {
  CurrencyFrom: string;
  CurrencyTo: string;
  Amount: number;
  ExchangeFrom: number;
  ExchangeTo: number;
  Result: number;

  constructor(_currencyFrom: string, _currencyTo: string, _amount: number, _exchangeFrom: number, _exchangeTo: number) {
    this.CurrencyFrom = _currencyFrom;
    this.CurrencyTo = _currencyTo;
    this.Amount = _amount;
    this.ExchangeFrom = _exchangeFrom;
    this.ExchangeTo = _exchangeTo;
  }

  calculate(): number {
    this.Result = (this.Amount * this.ExchangeFrom) / this.ExchangeTo;
    return this.Result;
  }
}
