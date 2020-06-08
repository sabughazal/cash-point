import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/services/item/item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductPackagesComponent } from 'src/components/product-packages/product-packages.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.css']
})
export class ProductPage implements OnInit {

  updatePriceForm: FormGroup;
  productId: any;
  product: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute, private itemService: ItemService) {
    this.productId = this.route.snapshot.paramMap.get('id');
    // prepare the form group
    this.updatePriceForm = this.formBuilder.group({
      price: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.itemService.getItemById(this.productId).then(response => {
      if (response.data[0]) {
        this.product = response.data[0];
        this.updatePriceForm.get('price').setValue(this.product.selling_price);
      }
    });
  }

  onPackagesClick() {
    this.modalService.open(ProductPackagesComponent, { size: 'lg' });
  }

  onUpdatePriceFormSubmit(form) {
    if(!form.valid || form.value.price == this.product.selling_price) {
      return;
    }
    // this.apiService.updateItemPrice(this.sku, f.price).subscribe(function (data) {
    //   this.loadItemDetails(this.sku);
    //   this.updatePriceForm.reset();
    // }.bind(this));
  }

}
