import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/services/expense/expense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewExpenseComponent } from 'src/components/new-expense/new-expense.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.css']
})
export class ExpensesPage implements OnInit {

  currentExpenses: Array<any> = [];

  constructor(private expenses: ExpenseService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadExpenses();
  }

  onRecordExpenseClick() {
    var modalRef = this.modalService.open(NewExpenseComponent, {size: 'md'});
    modalRef.result.then(() => {
      this.loadExpenses();
    });
  }


  /** PRIVATE METHODS */

  private loadExpenses() {
    this.expenses.getRecordedExpenses().then(response => {
      if (response) {
        this.currentExpenses = response.data;
      }
    });
  }

}
