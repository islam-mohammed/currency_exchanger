import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { SelectModule } from '@app/shared/controls';
import { TextModule } from '@app/shared/controls/text/text.module';

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [CommonModule, SelectModule, TextModule, FormsModule],
  exports: [CurrencyConverterComponent],
})
export class CurrencyConverterModule {}
