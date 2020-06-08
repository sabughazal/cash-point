import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    
  }

  onSaveClick(form) {
    if (!form.valid) return;
    console.log(form);
    this.activeModal.dismiss();
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required)
    });
  }

}
