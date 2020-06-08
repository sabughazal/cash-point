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
    if (!form.valid) return;
    console.log(form);
    this.activeModal.dismiss();
  }

  loadCategoriesDropdown() {
    this.itemService.getCategories().then(response => {
      this.categories = response.data;
    });
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.form = this.formBuilder.group({
      description: new FormControl(null, Validators.required),
      category: new FormControl('', Validators.required),
      barcode: new FormControl(null, Validators.required),
      by_weight: new FormControl(false, Validators.required)
    });
  }

}
