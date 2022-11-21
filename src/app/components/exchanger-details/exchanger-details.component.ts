import { CurrencyExchangeService } from './../../services/currency-exchange.service';
import { ExchangeDetailsParams } from './../../models/frontend-models';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ConvertEventArgs } from '@app/models/frontend-models';

@Component({
  selector: 'ce-exchanger-details',
  templateUrl: './exchanger-details.component.html',
  styleUrls: ['./exchanger-details.component.scss'],
})
export class ExchangerDetailsComponent {
  @Input() title: string = '';
  convertData: ConvertEventArgs | undefined;
  @Input()
  set exchangeDetails(value: ExchangeDetailsParams) {
    if (value) {
      this.exchangeService.setDetailsParams(value);
    }
  }
  constructor(
    private router: Router,
    private exchangeService: CurrencyExchangeService
  ) {}

  backToHome() {
    this.router.navigateByUrl('/');
  }
}
