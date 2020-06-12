import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }


  newPurchase(purchase, supplierId): Promise<any> {
    return new Promise((resolve, reject) => {
      var values = [
        supplierId,
        `'${purchase.external_document}'`,
        `'${purchase.purchase_date}'`,
        purchase.subtotal,
        purchase.total_discount,
        purchase.net_amount,
        purchase.total_vat,
        purchase.grand_total,
        `'${purchase.type}'`,
        purchase.paid,
        purchase.date_paid,
        `'${purchase.note}'`
      ];
      var stmt = `INSERT INTO purchase(supplier, external_document, purchase_date, subtotal, total_discount, net_amount, total_vat, grand_total, type, paid, date_paid, note) 
      VALUES (${values.join(',')})`;

      let options = {
        params: {
          insert: stmt
        }
      };
      this.http.get(endpoint, options).toPromise().then((response: any) => {
        var promises = [];
        if (response.result) {
          for (let i = 0; i < purchase.items.length; i++) {
            promises.push(this.newPurchaseItem(response.insert_id, purchase.items[i]));            
          }
        }
        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  }


  /** PRIVATE METHODS */

  private newPurchaseItem(purchaseId, item): Promise<any> {
    var values = [
      purchaseId,
      item.id,
      item.quantity, 
      item.base_cost,
      item.discount, 
      item.net_amount,
      item.vat_amount, 
      item.vat_percentage,
      item.total_cost,
      `'${item.type}'`
    ];
    var stmt = `INSERT INTO purchase_item(purchase, item, quantity, base_cost, discount, net_amount, vat_amount, vat_percentage, total_cost, type) 
    VALUES (${values.join(',')})`;
    let options = {
      params: {
        insert: stmt
      }
    };
    return this.http.get(endpoint, options).toPromise();
  }

}
