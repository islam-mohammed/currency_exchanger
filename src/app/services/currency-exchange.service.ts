import {
  CurrencyExchangeRate,
  CurrencyExchangeRates,
  ListItem,
} from '@app/models/frontend-models';
import { HttpErrorHandlingService } from './http-error-handleing.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ExchangeRateResponse,
  SymbolResponse,
} from '@app/models/backend.models';
import { environment } from '../../environments/environment';
import { catchError, Observable, map, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeService {
  mostPopulerCurrencies: string[] =
    environment.most_popular_currencies.split(',');
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandlingService
  ) {}
  private _currencies: ListItem[] = [];
  private _currencyExchangeRate: CurrencyExchangeRates = {};

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
      catchError(this.errorHandler.handleError)
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
        catchError(this.errorHandler.handleError)
      );
  }

  private isFetched(from: string, to: string): boolean {
    const exchange = this._currencyExchangeRate[from];
    if (exchange && exchange.currencies[`${from + to}`]) {
      return true;
    }
    return false;
  }
}
