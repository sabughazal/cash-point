import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/services/item/item.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-packages',
  templateUrl: './product-packages.component.html',
  styleUrls: ['./product-packages.component.css']
})
export class ProductPackagesComponent implements OnInit {

  @Input() product: any;
  packages: Array<any> = [1,2,3,4,5,6,7,8,9,0];
  selectItemModalRef: NgbModalRef;
  selectedItem: any;
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    console.log(this.product);
    this.loadPackages();
    this.buildForm();
  }

  onSubmit(form) {
    console.log(form.value);
  }

  onPackageItemSelect(packageItem) {
    // prevent selecting the same item as parent
    if (packageItem.id == this.product.id) 
      return;

    this.selectedItem = packageItem;
    this.form.get('item').setValue(packageItem.id);
    if (this.selectItemModalRef) {
      this.selectItemModalRef.dismiss();
    }
  }

  changeSelectedItem() {
    this.selectedItem = null;
    this.form.get('item').setValue(null);
  }

  openModal(modal) {
    this.selectItemModalRef = this.modalService.open(modal, {size: 'lg'});
  }


  /** PRIVATE METHODS */

  private loadPackages() {
    this.itemService.getPackagesOf(this.product.id).then(response => {
      this.packages = response.data;
    });
  }
  
  private buildForm() {
    this.form = this.formBuilder.group({
      item: new FormControl(null, Validators.required),
      subitem: new FormControl(this.product.id, Validators.required),
      subitem_count: new FormControl(null, Validators.required)
    });
  }

}
