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

  onViewClick(supplier) {

  }

  onNewSupplierClick() {
    var ref = this.modalService.open(NewSupplierComponent, { size: 'lg' });
    ref.result.finally(() => {
      this.loadSuppliers();
    });
  }
  

  /** PRIVATE METHODS */

  private loadSuppliers() {
    this.supplierService.getSuppliers().then(response => {
      this.currentSuppliers = response.data;
    });
  }

}
