import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSaleComponent } from './refund-sale.component';

describe('RefundSaleComponent', () => {
  let component: RefundSaleComponent;
  let fixture: ComponentFixture<RefundSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
