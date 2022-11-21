import { WindowService } from './../../services/window.service';
import { CurrencyExchangeService } from '@app/services/currency-exchange.service';
import { ExchangeDetailsParams, ChartBar } from '@app/models/frontend-models';
import { Router } from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ConvertEventArgs } from '@app/models/frontend-models';
import { take, Observable } from 'rxjs';

@Component({
  selector: 'ce-exchanger-details',
  templateUrl: './exchanger-details.component.html',
  styleUrls: ['./exchanger-details.component.scss'],
})
export class ExchangerDetailsComponent {
  title = '';
  chartView: [number, number];
  @HostListener('window:resize')
  onWindowResize() {
    const screenWidth = +this.windowService.window?.innerWidth!;
    this.chartView = [screenWidth / 1.35, 400];
  }

  @Input()
  set exchangeDetails(value: ExchangeDetailsParams) {
    if (value) {
      this.exchangeService.setDetailsParams(value);
      this.populateChart(value.basedCurrency, value.convertCurrency);
    }
  }

  history$: Observable<ChartBar[]>;
  constructor(
    private router: Router,
    private exchangeService: CurrencyExchangeService,
    private windowService: WindowService
  ) {}
  populateChart(basedCurrency: string, convertCurrency: string): void {
    this.history$ = this.exchangeService.getHistoryData(
      basedCurrency,
      convertCurrency
    );
    this.history$.subscribe(console.log);
  }

  onConvert(event: ConvertEventArgs) {
    this.title = `${event.basedCurrency} - ${event.basedCurrencyName}`;
    this.populateChart(event.basedCurrency, event.convetCurrency);
  }

  backToHome() {
    this.router.navigateByUrl('/');
  }
}
