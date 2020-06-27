import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleComponent } from 'src/components/sale/sale.component';
import { ItemLookupComponent } from 'src/components/item-lookup/item-lookup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  @ViewChild('sale', {static: true}) sale: SaleComponent;
  @ViewChild('itemLookup', {static: true}) itemLookup: ItemLookupComponent;
  
  constructor() {

  } 

  ngOnInit() {
    
  }

  onItemSelect(item) {
    this.sale.addItem(item);
    this.itemLookup.focusOnBarcodeInput();
  }

  onSaleChange() {
    this.itemLookup.focusOnBarcodeInput();
  }

}
