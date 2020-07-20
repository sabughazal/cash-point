import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePreviewComponent } from './purchase-preview.component';

describe('PurchasePreviewComponent', () => {
  let component: PurchasePreviewComponent;
  let fixture: ComponentFixture<PurchasePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
