import { Routes, RouterModule } from '@angular/router';
import { ExchangerModule } from './../../components/exchanger/exchanger.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  imports: [CommonModule, ExchangerModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
