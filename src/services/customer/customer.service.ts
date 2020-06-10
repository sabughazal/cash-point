import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getCustomers(query = null): Promise<any> {
    var stmt = `SELECT *, 
        (SELECT SUM(T.credit) - SUM(T.debit) FROM customer_transaction AS T WHERE T.customer=C.id) AS total_credit,
        (SELECT MAX(S.ts) FROM sale AS S WHERE S.customer=C.id) AS last_sale
    FROM customer AS C WHERE 1=1`;
    if (query) {
      stmt += ` AND C.name LIKE "%${query}%" OR C.address LIKE "%${query}%" OR C.contact LIKE "%${query}%"`;
    }
    stmt += " ORDER BY C.date_added DESC LIMIT 100;";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getCustomerById(id): Promise<any> {
    var stmt = `SELECT *, 
        (SELECT SUM(T.credit) - SUM(T.debit) FROM customer_transaction AS T WHERE T.customer=C.id) AS total_credit,
        (SELECT MAX(S.ts) FROM sale AS S WHERE S.customer=C.id) AS last_sale
    FROM customer AS C WHERE 1=1`;
    stmt += ` AND C.id = ${id};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  newCustomer(customer): Promise<any> {
    var stmt = `INSERT INTO customer(name, address, contact) 
    VALUES ("${customer.name}", "${customer.address}", "${customer.contact}")`;
		let options = {
      params: {
        insert: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  recordPayment(customer, amount): Promise<any> {
    return this.newCustomerTransaction(customer, null, 0, amount);
  }


  getCustomerTransactions(id): Promise<any> {
    var stmt = `SELECT T.*, S.refund_reference 
    FROM customer_transaction AS T LEFT JOIN sale AS S ON T.sale=S.id
    WHERE T.customer = ${id} ORDER BY T.ts DESC LIMIT 100;`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  newCustomerTransaction(customer, sale, debit, credit): Promise<any> {
    var stmt = `INSERT INTO customer_transaction(customer, sale, debit, credit) 
    VALUES (${[customer ? customer : "NULL", sale ? sale : "NULL", debit, credit].join(",")})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    return this.http.get(endpoint, options).toPromise();
  }

}
