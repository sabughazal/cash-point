import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/services/item/item.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  form: FormGroup;
  categories: Array<any> = [];

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.loadCategoriesDropdown();
  }

  onSaveClick(form) {
    // console.log(form.value);
    // return;
    if (!form.valid) return;
    if (form.value.barcode == '') form.value.barcode = null;
    if (form.value.code == '') form.value.code = null;
    this.form.get('vat_amount').enable();
    this.itemService.newItem(form.value).then(() => {
      this.activeModal.close();
    });
    this.form.get('vat_amount').disable();
  }

  loadCategoriesDropdown() {
    this.itemService.getCategories().then(response => {
      this.categories = response.data;
    });
  }

  recalculateBasePrice(sellingPrice) {
    var vatPercent = this.form.get('vat_percentage').value;
    var basePrice = sellingPrice / (1 + vatPercent);
    this.form.get('base_price').setValue(basePrice.toFixed(2));
    this.form.get('vat_amount').setValue((sellingPrice - basePrice).toFixed(2));
  }

  recalculateSellingPrice(basePrice) {
    var vatPercent = this.form.get('vat_percentage').value;
    var sellingPrice = basePrice * (1 + vatPercent);
    this.form.get('selling_price').setValue(sellingPrice.toFixed(2));
    this.form.get('vat_amount').setValue((sellingPrice - basePrice).toFixed(2));
  }

  recalculatePrices() {
    var basePrice = this.form.get('base_price').value;
    this.recalculateSellingPrice(basePrice);
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.form = this.formBuilder.group({
      description: new FormControl(null, Validators.required),
      category: new FormControl(''),
      barcode: new FormControl(null),
      code: new FormControl(null),
      base_price: new FormControl(null, Validators.required),
      vat_percentage: new FormControl(0.05, Validators.required),
      vat_amount: new FormControl({value: null, disabled: true}, Validators.required),
      selling_price: new FormControl(null, Validators.required),
      by_weight: new FormControl(false, Validators.required)
    });
  }

}
