import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.page.html',
  styleUrls: ['./new-purchase.page.css']
})
export class NewPurchasePage implements OnInit {

  items: Array<any> = [1]

  constructor() { }

  ngOnInit() {

  }

  onAddItemClick() {

  }

}
