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
