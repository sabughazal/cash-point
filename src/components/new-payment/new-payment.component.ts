import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService } from 'src/services/purchase/purchase.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  @Input() purchase: any;
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
    this.buildForm(this.purchase);
  }

  onSaveClick(form) {
    if (!form.valid) 
      return;
    this.purchaseService.newPurchasePayment(form.value.purchase, form.value.amount).then(() => {
      this.activeModal.close();
    });
  }


  /** PRIVATE METHODS */

  private buildForm(purchase) {
    var max = purchase.grand_total - purchase.paid_amount;
    this.form = this.formBuilder.group({
      purchase: new FormControl(purchase.id, Validators.required),
      amount: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(max)]))
    });
  }

}
