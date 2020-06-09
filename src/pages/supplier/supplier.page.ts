import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/services/supplier/supplier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPaymentComponent } from 'src/components/new-payment/new-payment.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.css']
})
export class SupplierPage implements OnInit {

  supplierId: any;
  supplier: any;
  purchases: Array<any> = [];
  selectedPurchase: any;

  constructor(
    private modalService: NgbModal, 
    private route: ActivatedRoute, 
    private supplierService: SupplierService
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.loadSupplier();
  }

  viewPurchasePayments(purchase) {
    this.selectedPurchase = purchase;
  }

  onNewPaymentClick() {
    var ref = this.modalService.open(NewPaymentComponent, { size: 'lg' });
    ref.result.finally(() => {
      this.viewPurchasePayments(this.selectedPurchase.id);
    });
  }


  /** PRIVATE METHODS */

  private loadSupplier() {
    this.supplierService.getSupplierById(this.supplierId).then(response => {
      this.supplier = response.data;
    });
    this.supplierService.getSupplierPurchases(this.supplierId).then(response => {
      this.purchases = response.data;
    });
  }

  private loadPayments(purchaseId) {

  }

}
