import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SupplierService } from 'src/services/supplier/supplier.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {

  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSaveClick(form) {
    if (!form.valid) 
      return;
    this.supplierService.newSupplier(form.value);
    this.activeModal.close();
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      tax_number: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required)
    });
  }

}
