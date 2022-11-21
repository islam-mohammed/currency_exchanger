import {
  CurrencyExchangeRate,
  CurrencyExchangeRates,
  ExchangeDetailsParams,
  ChartBar,
  ListItem,
} from '@app/models/frontend-models';
import { CustomErrorHandler } from './custom-error-handler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ExchangeRateResponse,
  HistoryDataResponse,
  SymbolResponse,
} from '@app/models/backend.models';
import { environment } from '../../environments/environment';
import {
  catchError,
  Observable,
  map,
  of,
  shareReplay,
  BehaviorSubject,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeService {
  mostPopulerCurrencies: string[] =
    environment.most_popular_currencies.split(',');
  constructor(
    private http: HttpClient,
    private errorHandler: CustomErrorHandler
  ) {}
  private _currencies: ListItem[] = [];

  private _currencyExchangeRate: CurrencyExchangeRates = {};

  private _detailsParamChanged = new BehaviorSubject<ExchangeDetailsParams>({
    amount: 0,
    basedCurrency: '',
    convertCurrency: '',
  });

  get detailsParmsChanged() {
    return this._detailsParamChanged.asObservable();
  }

  getCurrencies(): Observable<ListItem[]> {
    const currencies: ListItem[] = [];
    if (this._currencies.length) return of(this._currencies);
    return this.http.get<SymbolResponse>(`${environment.api_url}/list`).pipe(
      shareReplay(),
      map((response) => {
        Object.entries(response.currencies).map((entry) => {
          currencies.push({
            text: entry[1],
            value: entry[0],
            imageUrl: `assets/flags/${entry[0].toLowerCase()}.png`,
          });
        });
        this._currencies = currencies;
        return currencies;
      }),
      catchError(this.errorHandler.handleHttpError)
    );
  }
  getCurrencyExchangeRates(
    from: string,
    to: string
  ): Observable<CurrencyExchangeRate> {
    // We shouldn't cache this type of data. this is only to overcome API limitation.
    if (this.isFetched(from, to)) return of(this._currencyExchangeRate[from]);
    const currencies = [
      ...this.mostPopulerCurrencies.filter((symbol) => symbol !== from),
      to,
    ].join(',');

    const params = new HttpParams()
      .set('source', from)
      .set('currencies', currencies);

    return this.http
      .get<ExchangeRateResponse>(`${environment.api_url}/live`, { params })
      .pipe(
        map((exchange) => {
          this._currencyExchangeRate[exchange.source] = {
            currencies: exchange.quotes,
            timeStamp: exchange.timestamp,
          };
          return this._currencyExchangeRate[from];
        }),
        catchError(this.errorHandler.handleHttpError)
      );
  }

  getHistoryData(from: string, to: string): Observable<ChartBar[]> {
    let chartBarDate: ChartBar[] = [];
    const dt = new Date();
    const endDate = dt.toISOString().split('T')[0];
    dt.setMonth(dt.getMonth() - 12);
    const startDate = dt.toISOString().split('T')[0];

    const lastDaysInBetween = this.lastDaysInBetween(endDate);

    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('source', from)
      .set('currencies', to);

    return this.http
      .get<HistoryDataResponse>(`${environment.api_url}/timeframe`, { params })
      .pipe(
        map((history) => {
          return lastDaysInBetween.map((date) => {
            const name = new Date(date).toLocaleString('default', {
              month: 'long',
            });
            const value: number = history.quotes[date][`${from + to}`];
            return {
              name,
              value,
            };
          });
        }),
        catchError(this.errorHandler.handleHttpError)
      );
  }

  getCurrencyName(currency: string) {
    return this._currencies.find((cur) => cur.value === currency)?.text;
  }

  setDetailsParams(value: ExchangeDetailsParams) {
    this._detailsParamChanged.next(value);
  }

  private isFetched(from: string, to: string): boolean {
    const exchange = this._currencyExchangeRate[from];
    if (exchange && exchange.currencies[`${from + to}`]) {
      return true;
    }
    return false;
  }

  private lastDaysInBetween(toDate: string) {
    const arr = [toDate];
    const dt = new Date();
    dt.setDate(1);
    for (let i = 0; i <= 10; i++) {
      arr.push(
        new Date(dt.getFullYear(), dt.getMonth(), 1).toISOString().split('T')[0]
      );
      dt.setMonth(dt.getMonth() - 1);
    }
    return arr.reverse();
  }
}
