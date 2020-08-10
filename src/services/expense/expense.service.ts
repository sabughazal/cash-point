import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getRecordedExpenses(): Promise<any> {
    var stmt = `SELECT E.* FROM expense AS E WHERE 1=1`;
    stmt += " ORDER BY E.ts DESC;";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }

  recordNewExpense(expense): Promise<any> {
    var values = [
      `'${expense.date_of_expense}'`,
      `'${expense.external_document}'`,
      expense.amount,
      `'${expense.note}'`
    ];
    var stmt = `INSERT INTO expense(date_of_expense, external_document, amount, note) 
    VALUES (${values.join(',')})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    return this.http.get(endpoint, options).toPromise();
  }
}
