import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangerDetailsComponent } from './exchanger-details.component';
import { CurrencyConverterModule } from '../currency-converter/currency-converter.module';

@NgModule({
  declarations: [ExchangerDetailsComponent],
  imports: [CommonModule, CurrencyConverterModule],
  exports: [ExchangerDetailsComponent],
})
export class ExchangerDetailsModule {}
