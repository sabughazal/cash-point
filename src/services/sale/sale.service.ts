import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';
import { CustomerService } from '../customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient, private customerService: CustomerService) { }


  getSales(): Promise<any> {
    var stmt = `SELECT S.*, C.name AS customer_name FROM sale AS S LEFT JOIN customer AS C ON S.customer=C.id
    WHERE S.ts >= NOW() - INTERVAL 1 DAY ORDER BY S.ts DESC;`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


  getSaleById(saleId): Promise<any> {
    var stmt = `SELECT S.*, C.name AS customer_name FROM sale AS S LEFT JOIN customer AS C ON S.customer=C.id
    WHERE S.id = ${saleId};`;
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

  getSaleItems(saleId): Promise<any> {
    var stmt = `SELECT SI.*, I.description AS description, I.by_weight as by_weight, 
        (SELECT SUM(RI.quantity) FROM sale_item AS RI WHERE RI.sale IN (SELECT S.id FROM sale AS S WHERE S.refund_reference = SI.sale)) AS refunded 
    FROM sale_item AS SI JOIN item AS I ON SI.item=I.id WHERE sale = ${saleId};`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }


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
          promises.push(this.customerService.newCustomerTransaction(customer, response.insert_id, sale.grand_total, 0))
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

  newSaleRefund(reference, refund, customer = null): Promise<any> {
    return new Promise((resolve, reject) => {
      var values = [
        refund.subtotal,
        refund.total_discount,
        refund.net_amount,
        refund.total_vat,
        refund.grand_total,
        customer ? customer : 'NULL',
        `'${refund.type}'`,
        1, 
        'NOW()',
        reference
      ];
      var stmt = `INSERT INTO sale(subtotal, total_discount, net_amount, total_vat, grand_total, customer, type, paid, date_paid, refund_reference) 
      VALUES (${values.join(',')})`;
      let options = {
        params: {
          insert: stmt
        }
      };
      this.http.get(endpoint, options).toPromise().then((response: any) => {
        var promises = [];
        if (refund.type == 'credit' && customer) {
          promises.push(this.customerService.newCustomerTransaction(customer, response.insert_id, 0, refund.grand_total))
        }
        if (response.result) {
          for (let i = 0; i < refund.items.length; i++) {
            promises.push(this.newSaleRefundItem(response.insert_id, refund.items[i]));            
          }
        }
        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  }

  
  /** PRIVATE METHODS */

  private newSaleItem(saleId, item): Promise<any> {
    var values = [
      saleId,
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

  private newSaleRefundItem(saleRefundId, item): Promise<any> {
    var values = [
      saleRefundId,
      item.item, //item_id
      item.refund_quantity,
      item.base_price,
      0,
      item.base_price,
      item.vat_amount,
      item.total_price
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

}
