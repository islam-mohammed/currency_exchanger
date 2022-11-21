import { ConvertEventArgs } from '@app/models/frontend-models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ce-populer-currencies',
  templateUrl: './populer-currencies.component.html',
  styleUrls: ['./populer-currencies.component.scss'],
})
export class PopulerCurrenciesComponent {
  @Input() convertData: ConvertEventArgs | undefined;

  getExchangeRate(exhcangeRate: { key: string; value: string | null }) {
    if (this.convertData?.convertValue) {
      return (this.convertData?.convertValue * +exhcangeRate.value!).toFixed(4);
    }
    return `00.0 ${exhcangeRate.key}`;
  }

  constructor() {}
}
