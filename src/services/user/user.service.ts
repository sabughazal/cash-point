import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUsers(conditions): Promise<any> {
    var stmt = `SELECT id, firstname, lastname, date_joined, mobile, is_delivery, is_cashier FROM user AS U WHERE 1=1`;
    
    if (conditions.isDelivery) {
      stmt += ` AND U.is_delivery = 1`;
    }
    if (conditions.isCashier) {
      stmt += ` AND U.is_cashier = 1`;
    }
    
    stmt += " ORDER BY U.firstname ASC";
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
		return promise;
  }
}
