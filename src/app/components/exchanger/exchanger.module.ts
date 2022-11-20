import { PopulerCurrenciesModule } from './../populer-currencies/populer-currencies.module';
import { TextModule } from './../../shared/controls/text/text.module';
import { SelectModule } from './../../shared/controls/select/select.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExchangerComponent } from './exchanger.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExchangerComponent],
  imports: [
    CommonModule,
    SelectModule,
    TextModule,
    PopulerCurrenciesModule,
    FormsModule,
  ],
  exports: [ExchangerComponent],
  providers: [],
})
export class ExchangerModule {}
