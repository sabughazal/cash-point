import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCustomerComponent } from 'src/components/new-customer/new-customer.component';
import { CustomerService } from 'src/services/customer/customer.service';
import { CustomerLookupComponent } from 'src/components/customer-lookup/customer-lookup.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.css']
})
export class CustomersPage implements OnInit {

  @ViewChild('customerLookup', {static: false}) customerLookup: CustomerLookupComponent;
  currentCustomers: Array<any> = [];

  constructor(private modalService: NgbModal, private customerService: CustomerService) { }

  ngOnInit() {
    
  }

  onNewCustomerClick() {
    var ref = this.modalService.open(NewCustomerComponent, { size: 'lg' });
    ref.result.finally(() => {
      this.customerLookup.reload();
    });
  }

}
