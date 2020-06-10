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
    promise.then((response: any) => {
      response.data.map(el => {
        el.by_weight = (el.by_weight == '1') ? true : false;
        el.base_price = parseFloat(el.base_price);
        el.selling_price = parseFloat(el.selling_price);
        el.vat_amount = parseFloat(el.vat_amount);
      });
      return response;
    });
		return promise;
  }


  getItemByBarcode(barcode): Promise<any> {
    var stmt = "SELECT I.*, P.base_price, P.vat_amount, P.selling_price FROM item AS I JOIN price as P ON I.id=P.item WHERE P.date_added=(SELECT max(S.date_added) FROM price as S WHERE S.item=I.id)";
    stmt += ` AND I.barcode	LIKE "%${barcode}%" LIMIT 1;`;
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


  newItem(item): Promise<any> {
    return new Promise((resolve, reject) => {
      var values = [
        `"${item.description}"`,
        `${item.category != "" ? item.category : "NULL"}`,
        `"${item.barcode ? item.barcode : "NULL"}"`,
        item.code ? `"${item.code}"` : "NULL",
        item.by_weight ? 1 : 0
      ];
      var stmt = `INSERT INTO item(description, category, barcode, code, by_weight) 
      VALUES (${values.join(',')})`;
      let options = {
        params: {
          insert: stmt
        }
      };
      this.http.get(endpoint, options).toPromise().then((response:any) => {
        if (response.result) {
          this.newItemPrice(response.insert_id, item.base_price, item.vat_percentage, item.vat_amount, item.selling_price)
            .then(resolve).catch(reject);
        }
      });
    });
  }

  
  updateItemPrice(itemId, base, vat_percent, vat, selling): Promise<any> {
    return this.newItemPrice(itemId, base, vat_percent, vat, selling);
  }


  /** PRIVATE METHODS */

  private newItemPrice(itemId, base, vat_percent, vat, selling): Promise<any> {
    var stmt = `INSERT INTO price(item, base_price, vat_percentage, vat_amount, selling_price) 
    VALUES (${[itemId, base, vat_percent, vat, selling].join(',')})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }
  
}
