import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/services/item/item.service';

@Component({
  selector: 'app-stock-count',
  templateUrl: './stock-count.component.html',
  styleUrls: ['./stock-count.component.css']
})
export class StockCountComponent implements OnInit {

  @Input() product: any;

  updateStockForm: FormGroup;
  stockCounts: Array<any> = [];

  currentStock: number = 0;

  constructor(
    public activeModal: NgbActiveModal, 
    private itemService: ItemService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadStockCountHistory(this.product.id);
    this.loadCurrentStockCount(this.product.id);
  }


  onUpdateStockFormSubmit(form) {
    if(!form.valid) {
      return;
    }

    this.itemService.newItemStockCount(this.product.id, form.value.counted_quantity).then(() => {
      this.updateStockForm.reset();
      this.loadCurrentStockCount(this.product.id);
      this.loadStockCountHistory(this.product.id);
    });
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.updateStockForm = this.formBuilder.group({
      counted_quantity: new FormControl(null, Validators.compose([Validators.required, Validators.min(0)]))
    });
  }

  private loadStockCountHistory(itemId) {
    this.itemService.getStockCountsOf(itemId).then(response => {
      this.stockCounts = response.data;
    });
  }

  private loadCurrentStockCount(itemId) {
    this.itemService.getCurrentStockOf(itemId).then(response => {
      if (response.data[0]) {
        this.currentStock = response.data[0].stock_count;
      }
    });
  }

}
