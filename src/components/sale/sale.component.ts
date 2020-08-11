import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from 'src/services/sale/sale.service';
import { CustomerLookupComponent } from '../customer-lookup/customer-lookup.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('deliveryModal', {static: false}) deliveryModalElement: ElementRef;
  savedSales: Array<any> = [];

  saleItems: Array<any> = [];
  selectedCustomer: any = null;
  saleTotal: number = 0;
  saleVatAmount: number = 0;
  saleSubtotal: number = 0;
  saleTotalDiscount: number = 0;
  selectCustomerModalRef: NgbModalRef;
  deliveryModalRef: NgbModalRef;
  isDelivery: boolean = null;
  deliveryMan: any = null;

  constructor(private modalService: NgbModal, private saleService: SaleService) {
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

  onCustomerSelect(customer) {
    this.selectedCustomer = customer;
    if (this.selectCustomerModalRef) {
      this.selectCustomerModalRef.dismiss();
    }
    this.onChange.emit();
  }


  onDeliveryClick() {
    if (this.isDelivery === null) {
      this.isDelivery = false;
    } else if (this.isDelivery === true) {
      this.unsetDelivery();
    } else {
      // open modal
      this.deliveryModalRef = this.modalService.open(this.deliveryModalElement, {size: 'md'});
    }
  }


  onDeliveryManSelect(deliveryMan) {
    this.setDelivery(deliveryMan);
    this.deliveryModalRef.close();
  }
  

  onItemDelete(index) {
    this.saleItems.splice(index, 1);
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  onItemChange(index, item) {
    if (item.quantity <= 0) {
      this.onItemDelete(index);
    } else {
      this.saleItems[index] = item;
    }
    this.updateSummary();
    this.updateLocalStorage(); 
  }
  

  makePayment(type) {
    if(this.isDelivery === null) return;

    var customerId = null;
    var items = this.saleItems.map(item => {
      return {
        id: item.item.id,
        quantity: item.quantity,
        base_price: item.item.base_price,
        discount: item.item.base_price * ((item.discount / item.quantity) / item.item.selling_price),
        net_amount: item.item.base_price * (1 - ((item.discount / item.quantity) / item.item.selling_price)),
        vat_amount: item.item.vat_amount * (1 - ((item.discount / item.quantity) / item.item.selling_price)),
        total_price: item.item.selling_price * (1 - ((item.discount / item.quantity) / item.item.selling_price)),
      };
    });

    var sale = {
      subtotal: items.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.base_price);
      }, 0),
      total_discount: items.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.discount);
      }, 0),
      net_amount: items.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.net_amount);
      }, 0),
      total_vat: items.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.vat_amount);
      }, 0),
      grand_total: items.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.total_price);
      }, 0),
      items: items,
      is_delivery: this.isDelivery,
      delivered_by: this.deliveryMan ? this.deliveryMan.id : undefined,
      type: type
    }

    if (this.selectedCustomer && type == 'credit') {
      customerId = this.selectedCustomer.id;
    }

    this.saleService.newSale(sale, customerId).then(() => {
      this.clearSale();
    });
  }


  openCustomerModal(modal) {
    this.selectCustomerModalRef = this.modalService.open(modal, {size: 'lg'});
  }


  saveSale() {
    let sale = {
      title: `Sale ${this.saleTotal.toFixed(2)}`,
      customer: this.selectedCustomer,
      items: this.saleItems
    }
    this.savedSales.push(sale);
    localStorage.setItem('saved_sales', JSON.stringify(this.savedSales));
    this.clearSale();
  }


  clearSale() {
    this.saleItems = [];
    this.selectedCustomer = null;
    this.unsetDelivery();
    this.updateSummary();
    this.updateLocalStorage(); 
  }


  selectSavedSale(index) {
    if (this.saleItems.length) {
      this.saveSale();
    }
    this.saleItems = this.savedSales[index].items;
    this.selectedCustomer = this.savedSales[index].customer;
    this.savedSales.splice(index, 1);
    localStorage.setItem('saved_sales', JSON.stringify(this.savedSales));
    this.updateSummary();
    this.updateLocalStorage(); 
  }
  

  addItem(item) {
    var quantity = 1;
    if (item.by_weight === "1") {
      quantity = parseFloat(prompt("("+item.description.trim()+")\nEnter Quantity: "));
      if (!quantity || quantity <= 0) return;
    }

    var index = this.saleItems.map(el => el.item.id).indexOf(item.id);
    if (index != -1) {
      if (item.by_weight === "1") {
        this.saleItems[index].quantity = quantity;
      } else {
        this.saleItems[index].quantity += quantity;
      }
    } else {
      this.saleItems.unshift({
        'item': item,
        'discount': 0,
        'quantity': quantity
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
    this.saleTotalDiscount = 0;
    
    for (let i = 0; i < this.saleItems.length; i++) {
      let qty = this.saleItems[i].quantity;
      let sub = qty * this.saleItems[i].item.base_price;
      let dis = this.saleItems[i].discount;
      let tot = (qty * this.saleItems[i].item.selling_price) - dis;
      let vat = qty * this.saleItems[i].item.vat_amount;

      this.saleTotal += tot;
      this.saleVatAmount += vat;
      this.saleSubtotal += sub;
      this.saleTotalDiscount += dis;
    }
    
    this.onChange.emit();
  }


  private setDelivery(deliveryMan) {
    this.isDelivery = true;
    this.deliveryMan = deliveryMan;
  }


  private unsetDelivery() {
    this.isDelivery = null;
    this.deliveryMan = null;
  }
  

  private updateLocalStorage() {
    localStorage.setItem('current_sale', JSON.stringify(this.saleItems));
  }

}
