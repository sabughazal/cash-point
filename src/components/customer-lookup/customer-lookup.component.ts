import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/services/customer/customer.service';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css']
})
export class CustomerLookupComponent implements OnInit {

  @Output() onCustomerSelect: EventEmitter<any> = new EventEmitter();
  @Input() allowView: boolean = false;
  @Input() allowSelect: boolean = false;
  currentCustomers: Array<any> = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.loadCustomers();
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

  onSelectClick(customer) {
    this.onCustomerSelect.emit(customer);
  }

  reload() {
    this.loadCustomers();
  }

  isOldCredit(totalCredit, lastSale) {
    var now = new Date().getTime();
    lastSale = new Date(lastSale).getTime();
    return totalCredit < 0 && (now - lastSale >= (2592000000)); // 30 days in ms
  }
  

  /** PRIVATE METHODS */

  private loadCustomers(query = null) {
    this.customerService.getCustomers(query).then(response => {
      this.currentCustomers = response.data;
    });
  }

}
