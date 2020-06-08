import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers(query = null): Promise<any> {
    var stmt = "SELECT * FROM supplier AS S WHERE 1=1";
    if (query) {
      stmt += ` AND S.name LIKE '%${query}%' OR S.contact LIKE '%${query}%' OR S.tax_number LIKE '%${query}%'`;
    }
    stmt += " ORDER BY S.name ASC LIMIT 100;";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }

  getSupplierById(id): Promise<any> {
    var stmt = "SELECT * FROM supplier AS S WHERE 1=1";
    stmt += ` AND S.id = ${id};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }
  
}
