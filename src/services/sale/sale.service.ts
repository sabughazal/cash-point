import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  newSale(sale, customer = null): Promise<any> {
    return new Promise((resolve, reject) => {
      var values = [
        sale.subtotal,
        sale.total_discount,
        sale.net_amount,
        sale.total_vat,
        sale.grand_total,
        customer ? customer : 'NULL',
        `'${sale.type}'`,
        sale.type == 'cash' ? 1 : 0,
        sale.type == 'cash' ? 'NOW()' : 'NULL'
      ];
      var stmt = `INSERT INTO sale(subtotal, total_discount, net_amount, total_vat, grand_total, customer, type, paid, date_paid) 
      VALUES (${values.join(',')})`;
      let options = {
        params: {
          insert: stmt
        }
      };
      this.http.get(endpoint, options).toPromise().then((response: any) => {
        var promises = [];
        if (sale.type == 'credit' && customer) {
          promises.push(this.newCustomerTransaction(customer, response.insert_id, sale.grand_total, 0))
        }
        if (response.result) {
          for (let i = 0; i < sale.items.length; i++) {
            promises.push(this.newSaleItem(response.insert_id, sale.items[i]));            
          }
        }
        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  }

  
  /** PRIVATE METHODS */

  private newSaleItem(sale, item): Promise<any> {
    var values = [
      sale,
      item.item.id,
      item.quantity,
      item.item.base_price,
      0,
      item.item.base_price,
      item.item.vat_amount,
      item.item.selling_price
    ];
    var stmt = `INSERT INTO sale_item(sale, item, quantity, base_price, discount, net_amount, vat_amount, total_price) 
    VALUES (${values.join(',')})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    return this.http.get(endpoint, options).toPromise();
  }

  private newCustomerTransaction(customer, sale, debit, credit): Promise<any> {
    var stmt = `INSERT INTO customer_transaction(customer, sale, debit, credit) 
    VALUES (${[customer ? customer : 'NULL', sale, debit, credit].join(',')})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    return this.http.get(endpoint, options).toPromise();
  }
}
