import { CurrencyConverterModule } from './../currency-converter/currency-converter.module';
import { PopulerCurrenciesModule } from './../populer-currencies/populer-currencies.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExchangerComponent } from './exchanger.component';

@NgModule({
  declarations: [ExchangerComponent],
  imports: [CommonModule, PopulerCurrenciesModule, CurrencyConverterModule],
  exports: [ExchangerComponent],
  providers: [],
})
export class ExchangerModule {}
