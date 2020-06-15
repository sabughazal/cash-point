import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewItemComponent } from 'src/components/new-item/new-item.component';
import { ItemService } from 'src/services/item/item.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.css']
})
export class StockPage implements OnInit {

  currentItems: Array<any> = [];

  constructor(private modalService: NgbModal, private itemService: ItemService) {

  }

  ngOnInit() {
    this.loadItems();
  }

  onNewItemClick() {
    var ref = this.modalService.open(NewItemComponent, { size: 'lg' });
    ref.result.finally(() => {
      this.loadItems();
    });
  }

  onSearchInput(query) {
    if (query == '') {
      this.onSearchClearClick();
      return;
    }
    this.loadItems(query);
  }

  onSearchClearClick() {
    this.loadItems();
  }
  

  /** PRIVATE METHODS */

  private loadItems(query = null) {
    this.itemService.getItems(query, null).then(response => {
      this.currentItems = response.data;
    });
  }

}
