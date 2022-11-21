import {
  ConvertEventArgs,
  ExchangeDetailsParams,
} from '@app/models/frontend-models';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  title = '';
  exchangeDetailsParams: ExchangeDetailsParams = {
    basedCurrency: '',
    convertCurrency: '',
    amount: 0,
  };

  ngOnInit(): void {
    const paramMap = this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('from') && paramMap.has('to')) {
        this.exchangeDetailsParams = {
          ...this.exchangeDetailsParams,
          basedCurrency: paramMap.get('from')!,
          convertCurrency: paramMap.get('to')!,
          amount: +paramMap.get('amount')!,
        };
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
}
