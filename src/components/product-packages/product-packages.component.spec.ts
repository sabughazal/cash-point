import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPackagesComponent } from './product-packages.component';

describe('ProductPackagesComponent', () => {
  let component: ProductPackagesComponent;
  let fixture: ComponentFixture<ProductPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
