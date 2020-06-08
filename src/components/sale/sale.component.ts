import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  saleItems: Array<any> = [];
  saleTotal: number = 0;
  saleTaxAmount: number = 0;
  saleSubtotal: number = 0;

  constructor() { }

  ngOnInit() {
    // var stored = localStorage.getItem('sale_items');
    // if(stored) {
    //   this.saleItems = JSON.parse(stored);
    //   this.updateSummary();
    // }
  }

  onDeleteClick(index) {
    this.saleItems.splice(index);
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
      this.saleItems.splice(index);
    } else {
      this.saleItems[index].quantity -= 1;
    }
    this.updateSummary();
    this.updateLocalStorage(); 
  }

  onCashClick() {

  }

  onCreditClick() {

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

  clear() {
    this.saleItems = [];
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  /** PRIVATE METHODS */

  private updateSummary() {
    this.saleTotal = 0;
    this.saleTaxAmount = 0;
    this.saleSubtotal = 0;
    for (let i = 0; i < this.saleItems.length; i++) {
      this.saleTotal += this.saleItems[i].quantity * this.saleItems[i].item.selling_price;
    }
  }

  private updateLocalStorage() {
    // localStorage.setItem('sale_items', JSON.stringify(this.saleItems));
  }

}
