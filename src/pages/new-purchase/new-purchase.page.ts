import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PurchaseService } from 'src/services/purchase/purchase.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.page.html',
  styleUrls: ['./new-purchase.page.css']
})
export class NewPurchasePage implements OnInit {

  supplierId: any;
  
  minDate: Date;
  maxDate: Date;
  defaultVatPercent: number = 0.05;
  purchaseForm: FormGroup;
  purchaseItems: Array<{item:any, form:FormGroup}> = [];
  itemLookupModal: NgbModalRef;

  subtotal: number = 0;
  totalDiscount: number = 0;
  totalVat: number = 0;
  grandTotal: number = 0;

  constructor(
    public location: Location,
    private route: ActivatedRoute, 
    private purchaseService: PurchaseService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('id')
    let today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.maxDate = today;
  }

  ngOnInit() {
    this.purchaseForm = this.formBuilder.group({
      purchase_date: new FormControl(null, Validators.required),
      external_document: new FormControl(null, Validators.required)
    });

    this.loadLocalStorage();
  }


  onItemSelect(item) {
    this.purchaseItems.push({
      item: item,
      form: this.getFormGroup(item)
    });
    this.itemLookupModal.close();
    this.updateLocalStorage();
  }

  
  onItemRemove(index) {
    this.purchaseItems.splice(index, 1);
    this.recalculateTotals();
    this.updateLocalStorage();
  }

  
  onPaymentClick(type) {
    if (this.purchaseForm.valid) {
      var itemsValid = true;
      for (let i = 0; i < this.purchaseItems.length; i++) {
        if(!this.purchaseItems[i].form.valid) {
          itemsValid = false;
          break;
        }
      }

      if (itemsValid) {
        var purchase = this.purchaseForm.value;
        purchase.type = type;
        purchase.subtotal = this.subtotal;
        purchase.total_discount = this.totalDiscount;
        purchase.net_amount = this.subtotal - this.totalDiscount;
        purchase.total_vat = this.totalVat;
        purchase.grand_total = this.grandTotal;
        purchase.paid = (purchase.type == 'cash') ? 1 : 0;
        purchase.date_paid = purchase.paid ? 'NOW()' : 'NULL';
        purchase.note = "None";
        purchase.items = this.purchaseItems.map(el => {
          el.form.get('net_amount').setValue(el.form.value.base_cost - el.form.value.discount);
          return el.form.value;
        });

        this.purchaseService.newPurchase(purchase, this.supplierId).then(response => {
          if (response.result) {
            this.location.back();
          }
        });
      }
    }
  }


  recalculateTotalCost(index, baseCost) {
    let vatPercent = this.purchaseItems[index].form.get('vat_percentage').value;
    let totalCost = baseCost * (1 + vatPercent);
    this.purchaseItems[index].form.get('total_cost').setValue(totalCost.toFixed(2));
    this.purchaseItems[index].form.get('vat_amount').setValue((totalCost - baseCost).toFixed(2));
    this.updateLocalStorage();
  }


  recalculateBaseCost(index, totalCost) {
    let vatPercent = this.purchaseItems[index].form.get('vat_percentage').value;
    let baseCost = totalCost / (1 + vatPercent);
    this.purchaseItems[index].form.get('base_cost').setValue(baseCost.toFixed(2));
    this.purchaseItems[index].form.get('vat_amount').setValue((totalCost - baseCost).toFixed(2));
    this.updateLocalStorage();
  }
  

  recalculateCosts(index) {
    let baseCost = this.purchaseItems[index].form.get('base_cost').value;
    this.recalculateTotalCost(index, baseCost);
  }
  
  
  recalculateTotals() {
    this.subtotal = 0;
    this.totalDiscount = 0;
    this.totalVat = 0;
    this.grandTotal = 0;

    for (let i = 0; i < this.purchaseItems.length; i++) {
      let baseCost = parseFloat(this.purchaseItems[i].form.value.base_cost);
      let vatAmount = parseFloat(this.purchaseItems[i].form.value.vat_amount);
      let totalCost = parseFloat(this.purchaseItems[i].form.value.total_cost);
      let type = this.purchaseItems[i].form.value.type;
      
      if (type == 'purchase') {
        this.subtotal += baseCost;
        this.totalVat += vatAmount;
        this.grandTotal += totalCost;
      } else {
        this.subtotal -= baseCost;
        this.totalVat -= vatAmount;
        this.grandTotal -= totalCost;
      }
    }

    this.updateLocalStorage();
  }


  openModal(modal) {
    this.itemLookupModal = this.modalService.open(modal, {size: 'lg'});
  }


  /** PRIVATE METHODS */

  private getFormGroup(item) {
    var form = this.formBuilder.group({
      id: new FormControl(item.id, Validators.required),
      quantity: new FormControl(null, Validators.compose([Validators.required, Validators.min(0.01)])),
      base_cost: new FormControl(null, Validators.required),
      discount: new FormControl(0, Validators.required),
      net_amount: new FormControl(null),
      vat_amount: new FormControl(null, Validators.required),
      vat_percentage: new FormControl(this.defaultVatPercent, Validators.required),
      total_cost: new FormControl(null, Validators.required),
      type: new FormControl('purchase', Validators.required)
    });
    return form;
  }


  private updateLocalStorage() {
    var storageVariable = "purchase_" + (this.supplierId).toString();

    if (this.purchaseItems.length) {
      localStorage.setItem(storageVariable, JSON.stringify({
        purchase: this.purchaseForm.value,
        items: this.purchaseItems.map(el => {
          return {
            item: el.item,
            form: el.form.value
          }
        })
      }));

    } else {
      localStorage.removeItem(storageVariable);
    }
  }

  private loadLocalStorage() {
    var storageVariable = "purchase_" + (this.supplierId).toString();
    var stored = JSON.parse(localStorage.getItem(storageVariable));

    if (stored) {
      this.purchaseForm.setValue(stored.purchase);
      for (let i = 0; i < stored.items.length; i++) {
        var form = this.getFormGroup(stored.items[i].item);
        form.setValue(stored.items[i].form);
  
        this.purchaseItems.push({
          item: stored.items[i].item,
          form: form
        });
      }
  
      this.recalculateTotals();
    }
  }

}
