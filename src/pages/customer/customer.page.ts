import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RefundSaleComponent } from 'src/components/refund-sale/refund-sale.component';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.css']
})
export class CustomerPage implements OnInit {

  form: FormGroup;
  transactions: Array<any> = [];

  customerId: any;
  customer: any;

  constructor(
    public location: Location,
    private modalService: NgbModal, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.loadCustomer(this.customerId);
    this.form = this.formBuilder.group({
      amount: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.loadTransactions();
  }

  onRefundClick(saleId) {
    var ref = this.modalService.open(RefundSaleComponent, { size: 'md' });
    ref.componentInstance.saleId = saleId;
    ref.result.finally(() => {
      this.loadCustomer(this.customerId);
      this.loadTransactions();
    });
  }

  onMakePaymentFormSubmit(form) {
    var confirmed = confirm("Make a payment of " + form.value.amount + " AED?");
    if (!confirmed) return;

    this.customerService.recordPayment(this.customerId, form.value.amount).then(() => {
      this.form.reset();
      this.loadCustomer(this.customerId);
      this.loadTransactions();
    });
  }


  /** PRIVATE METHODS */

  private loadTransactions() {
    this.customerService.getCustomerTransactions(this.customerId).then(response => {
      this.transactions = response.data;
    });
  }

  private loadCustomer(id) {
    this.customerService.getCustomerById(id).then(response => {
      this.customer = response.data[0];
    });
  }

}
