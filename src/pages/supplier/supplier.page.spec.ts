import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPage } from './supplier.page';

describe('SupplierPage', () => {
  let component: SupplierPage;
  let fixture: ComponentFixture<SupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
