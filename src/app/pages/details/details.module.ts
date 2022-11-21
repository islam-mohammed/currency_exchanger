import { ExchangerDetailsModule } from './../../components/exchanger-details/exchanger-details.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: DetailsComponent }];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    ExchangerDetailsModule,
    RouterModule.forChild(routes),
  ],
})
export class DetailsModule {}
