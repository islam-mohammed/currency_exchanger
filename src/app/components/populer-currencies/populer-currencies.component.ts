import { Component, Input } from '@angular/core';
import { CurrencyExchangeRate } from '@app/models/frontend-models';

@Component({
  selector: 'ce-populer-currencies',
  templateUrl: './populer-currencies.component.html',
  styleUrls: ['./populer-currencies.component.scss'],
})
export class PopulerCurrenciesComponent {
  @Input() exchangeRate: CurrencyExchangeRate | undefined;
  @Input() basedCurrency: string | undefined;
  @Input() value: number | undefined;

  getExchangeRate(exhcangeRate: { key: string; value: string | null }) {
    if (this.value) {
      return (this.value * +exhcangeRate.value!).toFixed(4);
    }
    return `00.0 ${exhcangeRate.key}`;
  }

  constructor() {}
}
