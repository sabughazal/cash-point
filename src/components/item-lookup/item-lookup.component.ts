import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ItemService } from 'src/services/item/item.service';

@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css']
})
export class ItemLookupComponent implements OnInit {

  @ViewChild('barcodeInput', {static: true}) barcodeInput: ElementRef;
  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();

  currentCategories: Array<any> = [];
  categoryStack: Array<any> = [];
  itemsPerRow: number = 6;
  itemSquareWidth: number = 120;
  currentItems: Array<any> = [];

  searchDelay: any;

  constructor(private itemService: ItemService) {

  }

  ngOnInit() {
    this.barcodeInput.nativeElement.focus();
    this.loadCategories();
    this.loadItems();
  }

  focusOnBarcodeInput() {
    this.barcodeInput.nativeElement.focus();
  }

  onCategoryClick(category) {
    this.categoryStack.push(category);
    this.loadCategories(category.id);
    this.loadItems(null, category.id);
  }

  onItemClick(item) {
    this.onItemSelect.emit(item);
  }

  onBackClick() {
    var len = this.categoryStack.length;
    if (len) {
      this.loadCategories(this.categoryStack[len-1].parent_category);
      this.loadItems(null, this.categoryStack[len-1].parent_category);
      this.categoryStack.splice(len-1, 1);
    }
  }

  onBarcodeInput(event) {
    let barcode = event.target.value;
    this.itemService.getItemByBarcode(barcode).then(response => {
      if (response.data.length === 1) {
        this.onItemSelect.emit(response.data[0]);
      }
    });
    event.target.value = "";
  }

  onCodeInput(event) {
    let code = event.target.value;
    this.itemService.getItemByCode(code).then(response => {
      if (response.data.length === 1) {
        this.onItemSelect.emit(response.data[0]);
      }
    });
    event.target.value = "";
  }

  onSearchInput(query) {
    if (this.searchDelay) {
      clearTimeout(this.searchDelay);
      this.searchDelay = null;
      console.log("Searching Canceled!");
    }
    this.searchDelay = setTimeout(() => {
      console.log("Searching...");
      
      if (query == '') {
        this.onSearchClearClick();
        return;
      }
      if (this.categoryStack.length > 0) {
        this.loadItems(query, this.categoryStack[this.categoryStack.length - 1]);
      } else {
        this.loadItems(query);
      }
      this.currentCategories = [];
    }, 900);
  }

  onSearchClearClick() {
    this.loadCategories();
    this.loadItems();
  }
  

  /** PRIVATE METHODS */

  private loadCategories(parent = null, all = false) {
    this.itemService.getCategories(parent, all).then(response => {
      this.currentCategories = response.data;
    });
  }

  private loadItems(query = null, category = null) {
    this.itemService.getItems(query, category).then(response => {
      this.currentItems = response.data;
    });
  }

}
