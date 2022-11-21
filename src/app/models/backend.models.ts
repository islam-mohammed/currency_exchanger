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

export interface HistoryQuotes {
  [key: string]: {
    [key: string]: number;
  };
}

export interface HistoryDataResponse {
  start_date: string;
  end_date: string;
  quotes: HistoryQuotes;
  source: string;
  success: boolean;
  timeframe: boolean;
}
