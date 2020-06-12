import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }


  getSuppliers(query = null): Promise<any> {
    var stmt = `SELECT S.*, 
        ((SELECT SUM(P.grand_total) FROM purchase as P WHERE P.supplier=S.id) - (SELECT SUM(PY.amount) FROM purchase_payment AS PY JOIN purchase AS P ON PY.purchase=P.id WHERE P.supplier=S.id)) AS total_credit 
    FROM supplier AS S WHERE 1=1`;
    if (query) {
      stmt += ` AND S.name LIKE '%${query}%' OR S.contact LIKE '%${query}%' OR S.tax_number LIKE '%${query}%'`;
    }
    stmt += " ORDER BY S.date_added DESC LIMIT 100;";
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
    promise.then((response: any) => {
      if (response.data[0])
        response.data = response.data[0];
      return response;
    });
		return promise;
  }


  getSupplierPurchases(id): Promise<any> {
    var stmt = "SELECT * FROM purchase AS P WHERE 1=1";
    stmt += ` AND P.supplier = ${id};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  newSupplier(supplier): Promise<any> {
    var stmt = `INSERT INTO supplier(name, contact, tax_number) 
    VALUES ("${supplier.name}", "${supplier.contact}", "${supplier.tax_number}")`;
		let options = {
      params: {
        insert: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }
  
}
