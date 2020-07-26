import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/services/supplier/supplier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPaymentComponent } from 'src/components/new-payment/new-payment.component';
import { PurchaseService } from 'src/services/purchase/purchase.service';
import { PurchasePreviewComponent } from 'src/components/purchase-preview/purchase-preview.component';

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
  currentPayments: Array<any> = [];

  constructor(
    private modalService: NgbModal, 
    private route: ActivatedRoute, 
    private purchaseService: PurchaseService,
    private supplierService: SupplierService
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.loadSupplier();
  }

  viewPurchasePayments(purchase) {
    this.selectedPurchase = purchase;
    this.loadPayments(purchase.id);
  }

  onViewPurchaseClick(purchase) {
    var ref = this.modalService.open(PurchasePreviewComponent, { size: 'md' });
    ref.componentInstance.purchase = purchase;
  }

  onNewPaymentClick() {
    var ref = this.modalService.open(NewPaymentComponent, { size: 'sm' });
    ref.componentInstance.purchase = this.selectedPurchase;
    ref.result.finally(() => {
      this.loadSupplier();
      this.viewPurchasePayments(this.selectedPurchase);
    });
  }


  /** PRIVATE METHODS */

  private loadSupplier() {
    this.supplierService.getSupplierById(this.supplierId).then(response => {
      this.supplier = response.data;
    });
    this.supplierService.getSupplierPurchases(this.supplierId).then(response => {
      this.purchases = response.data;
      if (this.selectedPurchase) {
        this.selectedPurchase = this.purchases.find(el => {
          return el.id == this.selectedPurchase.id;
        });
      }
    });
  }

  private loadPayments(purchaseId) {
    this.purchaseService.getPurchasePayments(purchaseId).then(response => {
      this.currentPayments = response.data;
    });
  }

}
