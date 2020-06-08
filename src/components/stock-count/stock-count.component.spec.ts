import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCountComponent } from './stock-count.component';

describe('StockCountComponent', () => {
  let component: StockCountComponent;
  let fixture: ComponentFixture<StockCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
