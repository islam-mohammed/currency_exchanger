import { SymbolePipe } from './../../pipes/symbole.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopulerCurrenciesComponent } from './populer-currencies.component';

@NgModule({
  declarations: [PopulerCurrenciesComponent, SymbolePipe],
  imports: [CommonModule],
  exports: [PopulerCurrenciesComponent],
})
export class PopulerCurrenciesModule {}
