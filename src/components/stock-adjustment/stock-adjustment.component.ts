import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/services/item/item.service';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css']
})
export class StockAdjustmentComponent implements OnInit {

  @Input() product: any;
  subProduct: any;
  subProductCurrentStock: number;
  productCurrentStock: number;
  adjustQuantity: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.itemService.getItemById(this.product.subitem).then(response => {
      if (response.data[0])
        this.subProduct = response.data[0];
    });

    // load the current stock count of both items
    this.loadCurrentStockCount(this.product.id).then((count) => {
      this.productCurrentStock = parseFloat(count); // Package item
    });
    this.loadCurrentStockCount(this.product.subitem).then((count) => {
      this.subProductCurrentStock = parseFloat(count); // Sub item
    });
  }

  onIncreaseClick() {
    if (this.productCurrentStock && this.adjustQuantity < this.productCurrentStock) {
      this.adjustQuantity += 1;
    }
  }

  onDecreaseClick() {
    if (this.adjustQuantity > 0) {
      this.adjustQuantity -= 1;
    }
  }

  onSaveClick() {
    if (this.adjustQuantity > 0) {
      var newProductStockCount = this.productCurrentStock - (this.adjustQuantity);
      var newSubProductStockCount = this.subProductCurrentStock + (this.adjustQuantity * parseFloat(this.product.subitem_count));
      debugger;
      // update the count for both items
      Promise.all([
        this.itemService.newItemStockCount(this.product.id, newProductStockCount, `Adjusting quantity of ${this.adjustQuantity}.`),
        this.itemService.newItemStockCount(this.product.subitem, newSubProductStockCount, 
          `Adjusting package #${this.product.id}, resulting in quantity of ${this.adjustQuantity * this.product.subitem_count}.`)
      ]).then(() => {
        this.activeModal.dismiss();
      });
    } else {
      this.activeModal.dismiss();
    }
  }


  /** PRIVATE METHODS */

  private loadCurrentStockCount(itemId) {
    return this.itemService.getCurrentStockOf(itemId).then(response => {
      if (response.data[0]) {
        return response.data[0].stock_count;
      } else {
        return null;
      }
    });
  }

}
