import { ExchangerModule } from './components/exchanger/exchanger.module';
import { ApiInterceptorInterceptor } from './interceptors/api-interceptor.interceptor';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomErrorHandler } from './services/custom-error-handler';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ExchangerModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
