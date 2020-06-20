import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css']
})
export class SaleItemComponent implements OnInit {

  @Input() item: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  modalRef: NgbModalRef;
  form: FormGroup;

  @ViewChild('saleItemEditModal', {static: false}) editModal: NgbModalRef;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      new_amount: new FormControl(null, Validators.compose([Validators.required, Validators.min(0)]))
    });
  }

  onDeleteClick() {
    this.onDelete.emit();
  }

  onIncreaseClick() {
    // prompt for quantity if by weight
    if (this.item.item.by_weight === "1") {
      var quantity = parseFloat(prompt("Enter Quantity: "));
      if (!quantity || quantity <= 0) 
        return;
      this.item.quantity = quantity;
    } else {
      this.item.quantity += 1;
    }

    this.onChange.emit(this.item);
  }

  onDecreaseClick() {
    // prompt for quantity if by weight
    if (this.item.item.by_weight === "1") {
      var quantity = parseFloat(prompt("Enter Quantity: "));
      if (!quantity || quantity <= 0) 
        return;
      this.item.quantity = quantity;
    } else {
      this.item.quantity -= 1;
    }

    this.onChange.emit(this.item);
  }

  onEditClick() {
    this.modalRef = this.modalService.open(this.editModal, {size: 'sm'});
    this.form.get('new_amount').setValue((this.item.item.selling_price * this.item.quantity) - this.item.discount);
    this.modalRef.result.finally(() => {
      this.onChange.emit(this.item);
    });
  }

  onResetClick() {
    this.item.discount = 0;
    this.onChange.emit(this.item);
    this.modalRef.close();
  }

  onApplyClick() {
    if (this.form.valid) {
      this.item.discount = (this.item.item.selling_price * this.item.quantity) - this.form.value.new_amount;
    }
    this.onChange.emit(this.item);
    this.modalRef.close();
  }

}
