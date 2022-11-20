export interface ExchangeRateResponse {
  quotes: {
    [key: string]: number;
  };
  source: string;
  success: boolean;
  timestamp: number;
}

export interface SymbolResponse {
  currencies: { [key: string]: string };
  success: boolean;
}
