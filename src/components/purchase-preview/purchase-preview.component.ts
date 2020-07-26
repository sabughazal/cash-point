import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseService } from 'src/services/purchase/purchase.service';

@Component({
  selector: 'app-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit {

  @Input() purchase: any;
  items: Array<any> = [];

  constructor(public activeModal: NgbActiveModal, private purchases: PurchaseService) { }

  ngOnInit() {
    this.loadPurchaseItems();
  }


  /** PRIVATE METHODS */

  private loadPurchaseItems() {
    this.purchases.getPurchaseItems(this.purchase.id).then(response => {
      this.items = response.data;
    });
  }

}
