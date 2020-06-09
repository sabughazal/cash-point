import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  @Input() purchase: any;

  constructor() { }

  ngOnInit() {
    this.buildForm(this.purchase.id);
  }

  onSaveClick(form) {
    if (!form.valid) 
      return;
    // this.supplierService.newSupplier(form.value);
    // this.activeModal.close();
  }


  /** PRIVATE METHODS */

  private buildForm(purchaseId) {
    // this.form = this.formBuilder.group({
    //   name: new FormControl(null, Validators.required),
    //   tax_number: new FormControl(null, Validators.required),
    //   contact: new FormControl(null, Validators.required)
    // });
  }

}
