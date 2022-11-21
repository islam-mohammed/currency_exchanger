import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangerDetailsComponent } from '@app/components/exchanger-details/exchanger-details.component';
import { CurrencyConverterModule } from '@app/components/currency-converter/currency-converter.module';
@NgModule({
  declarations: [ExchangerDetailsComponent],
  imports: [CommonModule, CurrencyConverterModule, NgxChartsModule],
  exports: [ExchangerDetailsComponent],
})
export class ExchangerDetailsModule {}
