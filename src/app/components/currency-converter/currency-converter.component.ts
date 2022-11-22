import { SelectEventArgs } from '@app/models/frontend-models';
import {
  Component,
  EventEmitter,
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ce-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  basedCurrencyText = '';
  convertRate: number | undefined;
  isDeskTop = true;
  currencies$: Observable<ListItem[]> | undefined;
  exchangeRate: CurrencyExchangeRate | undefined;
  detailsParamsChangeSubscription: Subscription;

  @Input() title: string = '';
  @Input() isCurrencySelectDisabled = false;
  @Output() convert = new EventEmitter<ConvertEventArgs>();

  exchangeForm: FormGroup;

  get exchangeRateInfo() {
    return `${this.convertRate}${
      this.exchangeForm.get('convertCurrency')?.value
    }`;
  }

  get basedCurrency() {
    return this.exchangeForm.get('basedCurrency')?.value;
  }

  get convertCurrency() {
    return this.exchangeForm.get('convertCurrency')?.value;
  }

  get amountToConvert() {
    return +this.exchangeForm.get('amountToConvert')?.value;
  }

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.initObservers();
  }

  ngOnDestroy(): void {
    this.detailsParamsChangeSubscription.unsubscribe();
  }
  initForm() {
    this.exchangeForm = this.fb.group({
      basedCurrency: ['EUR'],
      convertCurrency: ['USD'],
      amountToConvert: ['1', Validators.required],
      convertedAmount: [''],
    });
  }

  initObservers() {
    this.detailsParamsChangeSubscription =
      this.currencyExchangeService.detailsParmsChanged
        .pipe(filter((params) => !!params.amount))
        .subscribe((params) => {
          this.exchangeForm.patchValue({
            basedCurrency: params.basedCurrency,
            convertCurrency: params.convertCurrency,
            amountToConvert: params.amount,
          });
          this.convertCurrencies();
        });

    this.currencies$ = this.currencyExchangeService
      .getCurrencies()
      .pipe(filter((currencies) => currencies.length > 0));
    this.convertCurrencies();
  }
  switchCurrencies() {
    const convert = this.exchangeForm.get('convertCurrency')?.value;
    this.exchangeForm.patchValue({
      basedCurrency: this.convertCurrency,
      convertCurrency: this.basedCurrency,
    });
    this.basedCurrencyText =
      this.currencyExchangeService.getCurrencyName(convert)!;
    this.convertCurrencies();
  }

  convertCurrencies() {
    if (this.exchangeForm.valid) {
      this.currencyExchangeService
        .getCurrencyExchangeRates(this.basedCurrency, this.convertCurrency)
        .pipe(take(1))
        .subscribe((exchangeRate) => {
          this.exchangeRate = exchangeRate;
          this.convertRate =
            exchangeRate.currencies[
              `${this.basedCurrency + this.convertCurrency}`
            ];
          this.exchangeForm.patchValue({
            convertedAmount: `${(
              this.convertRate * this.amountToConvert
            ).toFixed(4)} ${this.convertCurrency}`,
          });
          this.convert.emit({
            basedCurrency: this.basedCurrency,
            basedCurrencyName: this.basedCurrencyText,
            convetCurrency: this.convertCurrency,
            convertValue: this.amountToConvert,
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
        amount: this.amountToConvert,
      },
    });
  }
}
