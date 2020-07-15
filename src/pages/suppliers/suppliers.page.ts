import { Component, OnInit } from '@angular/core';
import { NewSupplierComponent } from 'src/components/new-supplier/new-supplier.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'src/services/supplier/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.css']
})
export class SuppliersPage implements OnInit {

  currentSuppliers: Array<any> = [];

  constructor(private modalService: NgbModal, private supplierService: SupplierService) { }

  ngOnInit() {
    this.loadSuppliers();
  }

  onNewSupplierClick() {
    var ref = this.modalService.open(NewSupplierComponent, { size: 'lg' });
    ref.result.finally(() => {
      this.loadSuppliers();
    });
  }

  onSearchInput(query) {
    if (query == '') {
      this.onSearchClearClick();
      return;
    }
    this.loadSuppliers(query);
  }

  onSearchClearClick() {
    this.loadSuppliers();
  }
  

  /** PRIVATE METHODS */

  private loadSuppliers(query = null) {
    this.supplierService.getSuppliers(query).then(response => {
      this.currentSuppliers = response.data;
    });
  }

}
