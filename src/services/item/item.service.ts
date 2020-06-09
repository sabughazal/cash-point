import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getCategories(parent = null, all = true): Promise<any> {
    var stmt = "SELECT * FROM category WHERE parent_category IS NULL";
    if (parent) {
      stmt = `SELECT * FROM category WHERE parent_category = ${parent}`;
    } else if (all) {
      stmt = "SELECT * FROM category WHERE 1=1"
    }
		let options = {
      params: {
        query: stmt
      }
    };
    stmt += " ORDER BY name ASC;";
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getItems(query = null, category = null): Promise<any> {
    var stmt = "SELECT I.*, P.base_price, P.vat_amount, P.selling_price FROM item AS I JOIN price as P ON I.id=P.item WHERE P.date_added=(SELECT max(S.date_added) FROM price as S WHERE S.item=I.id)";
    if (query) {
      stmt += ` AND I.description	LIKE '%${query}%' OR I.barcode LIKE '%${query}%'`;
    }
    if (category) {
      stmt += ` AND I.category = ${category}`;
    }
    stmt += " ORDER BY I.date_added DESC LIMIT 100;";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getItemByBarcode(barcode): Promise<any> {
    var stmt = "SELECT I.*, P.base_price, P.vat_amount, P.selling_price FROM item AS I JOIN price as P ON I.id=P.item WHERE P.date_added=(SELECT max(S.date_added) FROM price as S WHERE S.item=I.id)";
    stmt += ` AND I.barcode	LIKE '%${barcode}%' LIMIT 1;`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getItemById(id): Promise<any> {
    var stmt = "SELECT I.*, P.base_price, P.vat_amount, P.selling_price FROM item AS I JOIN price as P ON I.id=P.item WHERE P.date_added=(SELECT max(S.date_added) FROM price as S WHERE S.item=I.id)";
    stmt += ` AND I.id = ${id};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getPackagesOf(id): Promise<any> {
    var stmt = "SELECT I.*, P.base_price, P.vat_amount, P.selling_price FROM item AS I JOIN price as P ON I.id=P.item WHERE P.date_added=(SELECT max(S.date_added) FROM price as S WHERE S.item=I.id)";
    stmt += ` AND I.subitem = ${id} ORDER BY I.subitem_count ASC;`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }
  
}
