export interface ExchangeRateResponse {
  quotes: {
    [key: string]: number;
  };
  source: string;
  success: boolean;
  timestamp: number;
}

export interface SymbolResponse {
  success: boolean;
  currencies: { [key: string]: string };
}
