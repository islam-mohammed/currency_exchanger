import {
  CurrencyExchangeRate,
  CurrencyExchangeRates,
  ListItem,
} from '@app/models/frontend-models';
import { HttpErrorHandlingService } from './http-error-handleing.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeRateResponse } from '@app/models/backend.models';
import { environment } from '../../environments/environment';
import { catchError, Observable, map, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeService {
  mostPopulerCurrencies: string[] =
    environment.most_popular_currencies.split(',');
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandlingService
  ) {}
  private _currencies: ListItem[] = [];
  private _currencyExchangeRate: CurrencyExchangeRates = {
    EUR: {
      currencies: {
        EURGBP: 0.87021,
        EURJPY: 145.19392,
        EURUSD: 1.03455,
      },
      timeStamp: 1668948723,
    },
    USD: {
      currencies: {
        USDEUR: 0.966604,
        USDGBP: 0.841149,
        USDJPY: 140.34504,
      },
      timeStamp: 1668949143,
    },
  };

  // getCurrenciesW(): Observable<ExchangeRate> {
  //   const currencies: ListItem[] = [];
  //   if (this._currencies.length) return of(this._currencies);
  //   return this.http.get<ExchangeRate>(`${environment.api_url}/list`).pipe(
  //     shareReplay(),
  //     map((response) => {
  //       Object.entries(response.currencies).map((entry) => {
  //         currencies.push({
  //           text: entry[1],
  //           value: entry[0],
  //           imageUrl: `assets/flags/${entry[0].toLowerCase()}.png`,
  //         });
  //       });
  //       this._currencies = currencies;
  //       return currencies;
  //     }),
  //     catchError(this.errorHandler.handleError)
  //   );
  // }

  getCurrencies(): Observable<ListItem[]> {
    const currencies: ListItem[] = [];
    const response = {
      success: true,
      currencies: {
        AED: 'United Arab Emirates Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram',
        ANG: 'Netherlands Antillean Guilder',
        AOA: 'Angolan Kwanza',
        ARS: 'Argentine Peso',
        AUD: 'Australian Dollar',
        AWG: 'Aruban Florin',
        AZN: 'Azerbaijani Manat',
        BAM: 'Bosnia-Herzegovina Convertible Mark',
        BBD: 'Barbadian Dollar',
        BDT: 'Bangladeshi Taka',
        BGN: 'Bulgarian Lev',
        BHD: 'Bahraini Dinar',
        BIF: 'Burundian Franc',
        BMD: 'Bermudan Dollar',
        BND: 'Brunei Dollar',
        BOB: 'Bolivian Boliviano',
        BRL: 'Brazilian Real',
        BSD: 'Bahamian Dollar',
        BTC: 'Bitcoin',
        BTN: 'Bhutanese Ngultrum',
        BWP: 'Botswanan Pula',
        BYN: 'New Belarusian Ruble',
        BYR: 'Belarusian Ruble',
        BZD: 'Belize Dollar',
        CAD: 'Canadian Dollar',
        CDF: 'Congolese Franc',
        CHF: 'Swiss Franc',
        CLF: 'Chilean Unit of Account (UF)',
        CLP: 'Chilean Peso',
        CNY: 'Chinese Yuan',
        COP: 'Colombian Peso',
        CRC: 'Costa Rican Col\u00f3n',
        CUC: 'Cuban Convertible Peso',
        CUP: 'Cuban Peso',
        CVE: 'Cape Verdean Escudo',
        CZK: 'Czech Republic Koruna',
        DJF: 'Djiboutian Franc',
        DKK: 'Danish Krone',
        DOP: 'Dominican Peso',
        DZD: 'Algerian Dinar',
        EGP: 'Egyptian Pound',
        ERN: 'Eritrean Nakfa',
        ETB: 'Ethiopian Birr',
        EUR: 'Euro',
        FJD: 'Fijian Dollar',
        FKP: 'Falkland Islands Pound',
        GBP: 'British Pound Sterling',
        GEL: 'Georgian Lari',
        GGP: 'Guernsey Pound',
        GHS: 'Ghanaian Cedi',
        GIP: 'Gibraltar Pound',
        GMD: 'Gambian Dalasi',
        GNF: 'Guinean Franc',
        GTQ: 'Guatemalan Quetzal',
        GYD: 'Guyanaese Dollar',
        HKD: 'Hong Kong Dollar',
        HNL: 'Honduran Lempira',
        HRK: 'Croatian Kuna',
        HTG: 'Haitian Gourde',
        HUF: 'Hungarian Forint',
        IDR: 'Indonesian Rupiah',
        ILS: 'Israeli New Sheqel',
        IMP: 'Manx pound',
        INR: 'Indian Rupee',
        IQD: 'Iraqi Dinar',
        IRR: 'Iranian Rial',
        ISK: 'Icelandic Kr\u00f3na',
        JEP: 'Jersey Pound',
        JMD: 'Jamaican Dollar',
        JOD: 'Jordanian Dinar',
        JPY: 'Japanese Yen',
        KES: 'Kenyan Shilling',
        KGS: 'Kyrgystani Som',
        KHR: 'Cambodian Riel',
        KMF: 'Comorian Franc',
        KPW: 'North Korean Won',
        KRW: 'South Korean Won',
        KWD: 'Kuwaiti Dinar',
        KYD: 'Cayman Islands Dollar',
        KZT: 'Kazakhstani Tenge',
        LAK: 'Laotian Kip',
        LBP: 'Lebanese Pound',
        LKR: 'Sri Lankan Rupee',
        LRD: 'Liberian Dollar',
        LSL: 'Lesotho Loti',
        LTL: 'Lithuanian Litas',
        LVL: 'Latvian Lats',
        LYD: 'Libyan Dinar',
        MAD: 'Moroccan Dirham',
        MDL: 'Moldovan Leu',
        MGA: 'Malagasy Ariary',
        MKD: 'Macedonian Denar',
        MMK: 'Myanma Kyat',
        MNT: 'Mongolian Tugrik',
        MOP: 'Macanese Pataca',
        MRO: 'Mauritanian Ouguiya',
        MUR: 'Mauritian Rupee',
        MVR: 'Maldivian Rufiyaa',
        MWK: 'Malawian Kwacha',
        MXN: 'Mexican Peso',
        MYR: 'Malaysian Ringgit',
        MZN: 'Mozambican Metical',
        NAD: 'Namibian Dollar',
        NGN: 'Nigerian Naira',
        NIO: 'Nicaraguan C\u00f3rdoba',
        NOK: 'Norwegian Krone',
        NPR: 'Nepalese Rupee',
        NZD: 'New Zealand Dollar',
        OMR: 'Omani Rial',
        PAB: 'Panamanian Balboa',
        PEN: 'Peruvian Nuevo Sol',
        PGK: 'Papua New Guinean Kina',
        PHP: 'Philippine Peso',
        PKR: 'Pakistani Rupee',
        PLN: 'Polish Zloty',
        PYG: 'Paraguayan Guarani',
        QAR: 'Qatari Rial',
        RON: 'Romanian Leu',
        RSD: 'Serbian Dinar',
        RUB: 'Russian Ruble',
        RWF: 'Rwandan Franc',
        SAR: 'Saudi Riyal',
        SBD: 'Solomon Islands Dollar',
        SCR: 'Seychellois Rupee',
        SDG: 'Sudanese Pound',
        SEK: 'Swedish Krona',
        SGD: 'Singapore Dollar',
        SHP: 'Saint Helena Pound',
        SLE: 'Sierra Leonean Leone',
        SLL: 'Sierra Leonean Leone',
        SOS: 'Somali Shilling',
        SRD: 'Surinamese Dollar',
        STD: 'S\u00e3o Tom\u00e9 and Pr\u00edncipe Dobra',
        SVC: 'Salvadoran Col\u00f3n',
        SYP: 'Syrian Pound',
        SZL: 'Swazi Lilangeni',
        THB: 'Thai Baht',
        TJS: 'Tajikistani Somoni',
        TMT: 'Turkmenistani Manat',
        TND: 'Tunisian Dinar',
        TOP: 'Tongan Pa\u02bbanga',
        TRY: 'Turkish Lira',
        TTD: 'Trinidad and Tobago Dollar',
        TWD: 'New Taiwan Dollar',
        TZS: 'Tanzanian Shilling',
        UAH: 'Ukrainian Hryvnia',
        UGX: 'Ugandan Shilling',
        USD: 'United States Dollar',
        UYU: 'Uruguayan Peso',
        UZS: 'Uzbekistan Som',
        VEF: 'Venezuelan Bol\u00edvar Fuerte',
        VES: 'Sovereign Bolivar',
        VND: 'Vietnamese Dong',
        VUV: 'Vanuatu Vatu',
        WST: 'Samoan Tala',
        XAF: 'CFA Franc BEAC',
        XAG: 'Silver (troy ounce)',
        XAU: 'Gold (troy ounce)',
        XCD: 'East Caribbean Dollar',
        XDR: 'Special Drawing Rights',
        XOF: 'CFA Franc BCEAO',
        XPF: 'CFP Franc',
        YER: 'Yemeni Rial',
        ZAR: 'South African Rand',
        ZMK: 'Zambian Kwacha (pre-2013)',
        ZMW: 'Zambian Kwacha',
        ZWL: 'Zimbabwean Dollar',
      },
    };
    Object.entries(response.currencies).map((entry) => {
      currencies.push({
        text: entry[1],
        value: entry[0],
        imageUrl: `assets/flags/${entry[0].toLowerCase()}.png`,
      });
    });
    this._currencies = currencies;
    return of(currencies);
  }

  getCurrencyExchangeRates(
    from: string,
    to: string
  ): Observable<CurrencyExchangeRate> {
    // We shouldn't cache this type of data. this is only to overcome API limitation.
    if (this.isFetched(from, to)) return of(this._currencyExchangeRate[from]);
    const currencies = [
      ...this.mostPopulerCurrencies.filter((symbol) => symbol !== from),
      to,
    ].join(',');

    const params = new HttpParams()
      .set('source', from)
      .set('currencies', currencies);

    return this.http
      .get<ExchangeRateResponse>(`${environment.api_url}/live`, { params })
      .pipe(
        map((exchange) => {
          this._currencyExchangeRate[exchange.source] = {
            currencies: exchange.quotes,
            timeStamp: exchange.timestamp,
          };
          return this._currencyExchangeRate[from];
        }),
        catchError(this.errorHandler.handleError)
      );
  }

  private isFetched(from: string, to: string): boolean {
    const exchange = this._currencyExchangeRate[from];
    if (exchange && exchange.currencies[`${from + to}`]) {
      return true;
    }
    return false;
  }
}
