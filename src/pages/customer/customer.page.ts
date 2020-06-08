import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.css']
})
export class CustomerPage implements OnInit {

  customerId: any;

  constructor(private route: ActivatedRoute) {
    this.customerId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    
  }

}
