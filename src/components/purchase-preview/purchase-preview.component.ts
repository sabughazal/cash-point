import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit {

  @Input() purchaseId;
  items: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
