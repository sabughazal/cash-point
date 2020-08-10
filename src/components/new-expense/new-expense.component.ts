import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/services/expense/expense.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {

  form: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(
    private activeModal: NgbActiveModal,
    private expenses: ExpenseService,
    private formBuilder: FormBuilder
    ) {
    let today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.maxDate = today;
  }

  ngOnInit() {
    this.buildForm();
  }


  onSaveClick() {
    if (!this.form.valid) return;
    this.expenses.recordNewExpense(this.form.value).then(() => {
      this.activeModal.close();
    });
  }


  /** PRIVATE METHODS */

  private buildForm() {
    this.form = this.formBuilder.group({
      date_of_expense: new FormControl(null, Validators.required),
      external_document: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.compose([Validators.required, Validators.min(0)])),
      note: new FormControl(null, Validators.required)
    });
  }

}
