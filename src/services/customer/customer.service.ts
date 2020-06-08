import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(query = null): Promise<any> {
    var stmt = "SELECT * FROM customer AS C WHERE 1=1";
    if (query) {
      stmt += ` AND C.name LIKE '%${query}%' OR C.address LIKE '%${query}%' OR C.contact LIKE '%${query}%'`;
    }
    stmt += " ORDER BY C.name ASC LIMIT 100;";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }

  getCustomerById(id): Promise<any> {
    var stmt = "SELECT * FROM customer AS C WHERE 1=1";
    stmt += ` AND C.id = ${id};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }

}
