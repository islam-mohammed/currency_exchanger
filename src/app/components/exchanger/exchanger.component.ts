import { CurrencyExchangeService } from './../../services/currency-exchange.service';
import { Observable, take } from 'rxjs';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CurrencyExchangeRate, ListItem } from '@app/models/frontend-models';
import { WindowService } from '@app/services/window.service';

@Component({
  selector: 'ce-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss'],
})
export class ExchangerComponent implements OnInit {
  @Input() title: string = '';
  basedCurrency = 'EUR';
  basedCurrencyValue = 1;
  convertCurrency = 'USD';
  convertCurrencyValue = '';
  basedCurrencyProp: number | undefined;

  isDeskTop = true;

  $symbols: Observable<ListItem[]> | undefined;
  exchangeRate: CurrencyExchangeRate | undefined;

  @HostListener('window:resize')
  onWindowResize() {
    const screenWidth = this.windowService.window?.innerWidth;
    if (screenWidth && screenWidth <= 768) {
      this.isDeskTop = false;
    }
  }

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.basedCurrencyValue = 1;
    this.$symbols = this.currencyExchangeService.getCurrencies();
    this.convertCurrencies();
  }
  switchCurrencies() {
    const base = this.basedCurrency;
    this.basedCurrency = this.convertCurrency;
    this.convertCurrency = base;
    this.convertCurrencies();
  }

  convertCurrencies() {
    this.basedCurrencyProp = this.basedCurrencyValue;
    if (!this.basedCurrencyValue) {
      this.convertCurrencyValue = `0.00`;
    } else {
      this.currencyExchangeService
        .getCurrencyExchangeRates(this.basedCurrency, this.convertCurrency)
        .pipe(take(1))
        .subscribe((exchangeRate) => {
          this.exchangeRate = exchangeRate;
          this.convertCurrencyValue = `${(
            exchangeRate.currencies[
              `${this.basedCurrency + this.convertCurrency}`
            ] * this.basedCurrencyValue
          ).toFixed(4)} ${this.convertCurrency}`;
        });
    }
  }
}
