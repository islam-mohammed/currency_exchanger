import { CurrencyConverterModule } from '@app/components/currency-converter/currency-converter.module';
import { PopulerCurrenciesModule } from '@app/components/populer-currencies/populer-currencies.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExchangerComponent } from './exchanger.component';

@NgModule({
  imports: [CommonModule, PopulerCurrenciesModule, CurrencyConverterModule],
  declarations: [ExchangerComponent],
  exports: [ExchangerComponent],
  providers: [],
})
export class ExchangerModule {}
