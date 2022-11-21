import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerDetailsComponent } from './exchanger-details.component';

describe('ExchangerDetailsComponent', () => {
  let component: ExchangerDetailsComponent;
  let fixture: ComponentFixture<ExchangerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
