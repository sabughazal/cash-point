import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT as endpoint } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http: HttpClient) { }


  getTodaySalesStatistics(): Promise<any> {
    var stmt = `CALL kpi_today_sales();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['today_cash_sales'] = parseFloat(response.data[0]['today_cash_sales']);
        response.data[0]['today_credit_sales'] = parseFloat(response.data[0]['today_credit_sales']);
        response.data[0]['today_total_sales'] = parseFloat(response.data[0]['today_total_sales']);
      }
      return response;
    });
		return promise;
  }


  getTodayPurchasesStatistics(): Promise<any> {
    var stmt = `CALL kpi_today_purchases();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['today_total_purchases'] = parseFloat(response.data[0]['today_total_purchases']);
      }
      return response;
    });
		return promise;
  }
  
}
