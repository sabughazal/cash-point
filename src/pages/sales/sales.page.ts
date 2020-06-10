import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/services/sale/sale.service';
import { RefundSaleComponent } from 'src/components/refund-sale/refund-sale.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.css']
})
export class SalesPage implements OnInit {

  currentSales: Array<any> = [];

  constructor(private modalService: NgbModal, private saleService: SaleService) { }

  ngOnInit() {
    this.loadSales();
  }

  onRefundClick(sale) {
    var ref = this.modalService.open(RefundSaleComponent, { size: 'md' });
    ref.componentInstance.sale = sale;
    ref.result.finally(() => {
      this.loadSales();
    });
  }


  /** PRIVATE METHODS */

  private loadSales() {
    this.saleService.getSales().then(response => {
      this.currentSales = response.data;
    });
  }

}
