import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.css']
})
export class SupplierPage implements OnInit {

  supplierId: any;

  constructor(private route: ActivatedRoute) {
    this.supplierId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    
  }

}
