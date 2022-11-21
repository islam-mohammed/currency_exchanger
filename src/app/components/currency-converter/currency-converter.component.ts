import { SelectEventArgs } from './../../models/frontend-models';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
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
import { filter, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'ce-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  basedCurrency = 'EUR';
  basedCurrencyText = 'Euro';
  basedCurrencyValue = 1;
  convertCurrency = 'USD';
  convertCurrencyValue = '';
  convertRate: number | undefined;
  basedCurrencyProp: number | undefined;
  isDeskTop = true;
  currencies$: Observable<ListItem[]> | undefined;
  exchangeRate: CurrencyExchangeRate | undefined;
  detailsParamsChangeSubscription: Subscription;

  @Input() title: string = '';
  @Input() isCurrencySelectDisabled = false;
  @Output() convert = new EventEmitter<ConvertEventArgs>();

  get exchangeRateInfo() {
    return `${this.convertRate}${this.convertCurrency}`;
  }

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private windowService: WindowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initObservers();
  }

  ngOnDestroy(): void {
    this.detailsParamsChangeSubscription.unsubscribe();
  }

  initObservers() {
    this.detailsParamsChangeSubscription =
      this.currencyExchangeService.detailsParmsChanged
        .pipe(filter((params) => !!params.amount))
        .subscribe((params) => {
          this.basedCurrencyValue = params.amount;
          this.basedCurrency = params.basedCurrency;
          this.convertCurrency = params.convertCurrency;
          this.convertCurrencies();
        });

    this.currencies$ = this.currencyExchangeService
      .getCurrencies()
      .pipe(filter((x) => !!x));
    this.convertCurrencies();
  }
  onBasedCurrencySelect(event: SelectEventArgs) {
    this.basedCurrencyText = event.text;
    this.basedCurrency = event.value;
  }
  onConvertCurrencySelect(event: SelectEventArgs) {
    this.convertCurrency = event.value;
  }

  switchCurrencies() {
    const base = this.basedCurrency;
    this.basedCurrency = this.convertCurrency;
    this.convertCurrency = base;
    this.basedCurrencyText = this.currencyExchangeService.getCurrencyName(
      this.basedCurrency
    )!;
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
            basedCurrencyName: this.basedCurrencyText,
            convetCurrency: this.convertCurrency,
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
        amount: this.basedCurrencyValue,
      },
    });
  }
}
