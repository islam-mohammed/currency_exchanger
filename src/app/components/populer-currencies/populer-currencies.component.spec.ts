import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerCurrenciesComponent } from './populer-currencies.component';

describe('PopulerCurrenciesComponent', () => {
  let component: PopulerCurrenciesComponent;
  let fixture: ComponentFixture<PopulerCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulerCurrenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulerCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
