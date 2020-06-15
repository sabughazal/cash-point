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
  }

  onIncreaseClick() {
    this.adjustQuantity += 1;

  }

  onDecreaseClick() {
    if (this.adjustQuantity > 0) {
      this.adjustQuantity -= 1;
    }
  }

  onSaveClick() {    
    if (this.adjustQuantity > 0) {
      this.itemService.adjustItemStock(this.product.id, this.adjustQuantity).then(response => {
        this.activeModal.dismiss();
      });
    } else {
      this.activeModal.dismiss();
    }
  }

}
