export interface ListItem {
  value: string;
  text?: string;
  imageUrl?: string;
}

export interface CurrencyExchangeRate {
  currencies: {
    [key: string]: number;
  };
  timeStamp: number;
}
export interface CurrencyExchangeRates {
  [key: string]: CurrencyExchangeRate;
}

export interface ConvertEventArgs {
  exchangeRate: CurrencyExchangeRate;
  basedCurrency: string;
  basedCurrencyName: string;
  convetCurrency: string;
  convertValue: number;
}

export interface SelectEventArgs {
  text: string;
  value: string;
}
export interface ExchangeDetailsParams {
  basedCurrency: string;
  convertCurrency: string;
  amount: number;
}

export interface ChartBar {
  name: string;
  value: number;
}
