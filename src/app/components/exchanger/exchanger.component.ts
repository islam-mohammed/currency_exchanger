import { ConvertEventArgs } from './../../models/frontend-models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ce-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss'],
})
export class ExchangerComponent {
  @Input() title: string = '';
  convertData: ConvertEventArgs | undefined;
}
