import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/services/item/item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductPackagesComponent } from 'src/components/product-packages/product-packages.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockCountComponent } from 'src/components/stock-count/stock-count.component';
import { StockAdjustmentComponent } from 'src/components/stock-adjustment/stock-adjustment.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.css']
})
export class ProductPage implements OnInit {

  updatePriceForm: FormGroup;
  productId: any;
  product: any;
  purchases: Array<any> = [];
  allowCount: boolean = false;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private itemService: ItemService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.updatePriceForm = this.formBuilder.group({
      price: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.loadProduct();
  }

  onPackagesClick() {
    var ref = this.modalService.open(ProductPackagesComponent, { size: 'lg' });
    ref.componentInstance.product = this.product;
  }

  onCountClick() {
    var ref = this.modalService.open(StockCountComponent, { size: 'lg' });
    ref.componentInstance.product = this.product;
  }

  onAdjustClick() {
    var ref = this.modalService.open(StockAdjustmentComponent, { size: 'lg' });
    ref.componentInstance.product = this.product;
  }

  onUpdatePriceFormSubmit(form) {
    if(!form.valid || form.value.price == this.product.selling_price) {
      return;
    }

    let vat_percentage = this.product.vat_percentage;
    let base_price = parseFloat(form.value.price) / (1 + parseFloat(vat_percentage));
    this.itemService.updateItemPrice(this.productId, base_price, vat_percentage, form.value.price - base_price, form.value.price).then(response => {
      this.loadProduct();
    });
  }


  /** PRIVATE METHODS */

  private loadProduct() {
    this.itemService.getItemById(this.productId).then(response => {
      if (response.data[0]) {
        this.product = response.data[0];
        this.updatePriceForm.get('price').setValue(this.product.selling_price);
      }
    });
    this.itemService.getPurchasesOf(this.productId).then(response => {
      this.purchases = response.data;
      this.allowCount = this.purchases.length > 0 ? true : false;
    });
  }

}
