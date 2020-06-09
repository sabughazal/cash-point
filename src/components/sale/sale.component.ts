import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/services/sale/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  savedSales: Array<any> = [];

  saleItems: Array<any> = [];
  saleTotal: number = 0;
  saleVatAmount: number = 0;
  saleSubtotal: number = 0;

  constructor(private saleService: SaleService) {
    var current = localStorage.getItem('current_sale');
    var saved = localStorage.getItem('saved_sales');
    if (current) {
      this.saleItems = JSON.parse(current);
      this.updateSummary();
    }
    if (saved) {
      this.savedSales = JSON.parse(saved);
    }
  }


  ngOnInit() {
    
  }


  saveSale() {
    let sale = {
      title: `Sale ${this.saleTotal.toFixed(2)}`,
      items: this.saleItems
    }
    this.savedSales.push(sale);
    localStorage.setItem('saved_sales', JSON.stringify(this.savedSales));
    this.clearSale();
  }


  clearSale() {
    this.saleItems = [];
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  selectSavedSale(index) {
    this.saleItems = this.savedSales[index].items;
    this.savedSales.splice(index, 1);
    localStorage.setItem('saved_sales', JSON.stringify(this.savedSales));
    this.updateSummary();
    this.updateLocalStorage(); 
  }
  

  onDeleteClick(index) {
    this.saleItems.splice(index, 1);
    this.updateSummary();
    this.updateLocalStorage(); 
  }

  
  onIncreaseClick(index) {
    this.saleItems[index].quantity += 1;
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  onDecreaseClick(index) {
    if (this.saleItems[index].quantity - 1 <= 0) {
      this.saleItems.splice(index, 1);
    } else {
      this.saleItems[index].quantity -= 1;
    }
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  onCashClick() {
    var sale = {
      subtotal: this.saleSubtotal,
      total_discount: 0,
      net_amount: this.saleSubtotal,
      total_vat: this.saleVatAmount,
      grand_total: this.saleTotal,
      items: this.saleItems,
      type: 'cash',
      paid: 1
    }
    this.saleService.newSale(sale, null).then(() => {
      this.clearSale();
    });
  }
  

  onCreditClick() {
    var sale = {
      subtotal: this.saleSubtotal,
      total_discount: 0,
      net_amount: this.saleSubtotal,
      total_vat: this.saleVatAmount,
      grand_total: this.saleTotal,
      items: this.saleItems,
      type: 'credit',
      paid: 1
    }
    console.log(sale);
  }
  

  addItem(item) {
    var index = this.saleItems.map(el => el.item.id).indexOf(item.id);

    if (index != -1) {
      this.saleItems[index].quantity += 1;
    } else {
      this.saleItems.unshift({
        'item': item,
        'quantity': 1
      });
    }

    this.updateSummary(); 
    this.updateLocalStorage(); 
  }


  /** PRIVATE METHODS */

  private updateSummary() {
    this.saleTotal = 0;
    this.saleVatAmount = 0;
    this.saleSubtotal = 0;
    for (let i = 0; i < this.saleItems.length; i++) {
      this.saleSubtotal += this.saleItems[i].quantity * this.saleItems[i].item.base_price;
      this.saleVatAmount += this.saleItems[i].quantity * this.saleItems[i].item.vat_amount;
      this.saleTotal += this.saleItems[i].quantity * this.saleItems[i].item.selling_price;
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('current_sale', JSON.stringify(this.saleItems));
  }

}
