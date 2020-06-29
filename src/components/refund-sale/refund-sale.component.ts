import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from 'src/services/sale/sale.service';

@Component({
  selector: 'app-refund-sale',
  templateUrl: './refund-sale.component.html',
  styleUrls: ['./refund-sale.component.css']
})
export class RefundSaleComponent implements OnInit {

  @Input() sale;
  @Input() saleId = null;
  items: Array<any> = [];

  refundSubtotal: number = 0;
  refundVatAmount: number = 0;
  refundTotal: number = 0;

  constructor(public activeModal: NgbActiveModal, private saleService: SaleService) { }

  ngOnInit() {
    if (this.saleId != null) {
      this.saleService.getSaleById(this.saleId).then(response => {
        this.sale = response.data;
        this.loadSaleItems(this.sale.id);
      });
    } else {
      this.loadSaleItems(this.sale.id);
    }
  }

  onDecreaseClick(index) {
    if (this.items[index].refund_quantity <= 0)
      return;
      
    // prompt for quantity if by weight
    if (this.items[index].by_weight === "1") {
      var remaining = Math.round((this.items[index].quantity - this.items[index].refunded) * 100) / 100;
      var quantity = parseFloat(prompt("Enter Quantity: "));
      if ((!quantity && quantity != 0) || quantity < 0 || quantity > remaining) 
        return;
      this.items[index].refund_quantity = quantity;
    } else {
      this.items[index].refund_quantity -= 1;
    }
    
    this.updateSummary();
  }

  onIncreaseClick(index) {
    var remaining = Math.round((this.items[index].quantity - this.items[index].refunded) * 100) / 100;
    if (this.items[index].refund_quantity >= remaining)
      return;

    // prompt for quantity if by weight
    if (this.items[index].by_weight === "1") {
      var quantity = parseFloat(prompt("Enter Quantity: "));
      if ((!quantity && quantity != 0) || quantity < 0 || quantity > remaining) 
        return;
      this.items[index].refund_quantity = quantity;
    } else {
      if (this.items[index].refund_quantity) {
        this.items[index].refund_quantity += 1;
      } else {
        this.items[index].refund_quantity = 1;
      }
    }

    this.updateSummary();
  }

  onRefundClick() {
    if (!this.refundTotal) 
      return;

    var items = this.items.filter(item => item.refund_quantity > 0).map(item => {
      return {
        id: item.item,
        refund_quantity: item.refund_quantity,
        base_price: item.net_amount,
        discount: 0,
        net_amount: item.net_amount,
        vat_amount:item.vat_amount,
        total_price: item.total_price
      };
    });
    
    var refund = {
      items: items,
      subtotal: this.refundSubtotal,
      total_discount: 0,
      net_amount: this.refundSubtotal,
      total_vat: this.refundVatAmount,
      grand_total: this.refundTotal,
      type: this.sale.type
    };
    this.saleService.newSaleRefund(this.sale.id, refund, this.sale.customer).then(() => {
      this.activeModal.close();
    });
  }

  
  /** PRIVATE METHODS */

  private loadSaleItems(saleId) {
    this.saleService.getSaleItems(saleId).then(response => {
      this.items = response.data.map(el => {
        el.refunded = el.refunded ? el.refunded : 0;
        el.refund_quantity = 0;
        return el;
      });
    });
  }

  private updateSummary() {
    this.refundSubtotal = 0;
    this.refundVatAmount = 0;
    this.refundTotal = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.refundSubtotal += this.items[i].refund_quantity * this.items[i].net_amount;
      this.refundVatAmount += this.items[i].refund_quantity * this.items[i].vat_amount;
      this.refundTotal += this.items[i].refund_quantity * this.items[i].total_price;
    }
  }

}
