import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCustomerComponent } from 'src/components/new-customer/new-customer.component';
import { CustomerService } from 'src/services/customer/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.css']
})
export class CustomersPage implements OnInit {

  currentCustomers: Array<any> = [];

  constructor(private modalService: NgbModal, private customerService: CustomerService) { }

  ngOnInit() {
    this.loadCustomers();
  }

  onNewCustomerClick() {
    this.modalService.open(NewCustomerComponent, { size: 'lg' });
  }

  onSearchInput(query) {
    if (query == '') {
      this.onSearchClearClick();
      return;
    }
    this.loadCustomers(query);
  }

  onSearchClearClick() {
    this.loadCustomers();
  }
  

  /** PRIVATE METHODS */

  private loadCustomers(query = null) {
    this.customerService.getCustomers(query).then(response => {
      this.currentCustomers = response.data;
    });
  }

}
