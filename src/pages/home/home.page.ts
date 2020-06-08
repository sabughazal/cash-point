import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleComponent } from 'src/components/sale/sale.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  @ViewChild('sale', {static: true}) sale: SaleComponent;
  
  constructor() {

  } 

  ngOnInit() {
    
  }

  onItemSelect(item) {
    this.sale.addItem(item);
  }

}
