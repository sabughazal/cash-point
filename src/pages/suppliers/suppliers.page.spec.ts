import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersPage } from './suppliers.page';

describe('SuppliersPage', () => {
  let component: SuppliersPage;
  let fixture: ComponentFixture<SuppliersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
