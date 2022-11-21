import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ConvertEventArgs,
  CurrencyExchangeRate,
  ListItem,
} from '@app/models/frontend-models';
import { CurrencyExchangeService } from '@app/services/currency-exchange.service';
import { WindowService } from '@app/services/window.service';
import { filter, Observable, take } from 'rxjs';

@Component({
  selector: 'ce-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  basedCurrency = 'EUR';
  basedCurrencyValue = 1;
  convertCurrency = 'USD';
  convertCurrencyValue = '';
  convertRate: number | undefined;
  basedCurrencyProp: number | undefined;

  isDeskTop = true;

  currencies$: Observable<ListItem[]> | undefined;
  exchangeRate: CurrencyExchangeRate | undefined;
  @Input() title: string = '';
  @Output() convert = new EventEmitter<ConvertEventArgs>();
  @HostListener('window:resize')
  onWindowResize() {
    const screenWidth = this.windowService.window?.innerWidth;
    if (screenWidth && screenWidth <= 768) {
      this.isDeskTop = false;
    }
  }

  get exchangeRateInfo() {
    return `${this.convertRate}${this.convertCurrency}`;
  }

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private windowService: WindowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.basedCurrencyValue = 1;
    this.currencies$ = this.currencyExchangeService
      .getCurrencies()
      .pipe(filter((x) => !!x));
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
          this.convertRate =
            exchangeRate.currencies[
              `${this.basedCurrency + this.convertCurrency}`
            ];
          this.convertCurrencyValue = `${(
            this.convertRate * this.basedCurrencyValue
          ).toFixed(4)} ${this.convertCurrency}`;
          this.convert.emit({
            basedCurrency: this.basedCurrency,
            convertValue: this.basedCurrencyProp || 0,
            exchangeRate: this.exchangeRate,
          });
        });
    }
  }

  showDetails() {
    this.router.navigate(['/details'], {
      queryParams: {
        from: this.basedCurrency,
        to: this.convertCurrency,
      },
    });
  }
}
