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
        response.data[0]['today_cash_purchases'] = parseFloat(response.data[0]['today_cash_purchases']);
        response.data[0]['today_credit_purchases'] = parseFloat(response.data[0]['today_credit_purchases']);
        response.data[0]['today_total_purchases'] = parseFloat(response.data[0]['today_total_purchases']);
      }
      return response;
    });
		return promise;
  }

  
  getTodayCustomerPapyments(): Promise<any> {
    var stmt = `CALL kpi_today_customer_payments();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['total_payments'] = parseFloat(response.data[0]['total_payments']);
      }
      return response;
    });
		return promise;
  }


  getTodaySupplierPayments(): Promise<any> {
    var stmt = `CALL kpi_today_supplier_payments();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['total_payments'] = parseFloat(response.data[0]['total_payments']);
      }
      return response;
    });
		return promise;
  }


  getDailySales(): Promise<any> {
    var stmt = `CALL kpi_daily_sales();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data = response.data.map(el => {
          let ts = new Date(el.day);
          return {
            name: ts.getDate().toString(),
            value: parseFloat(el.sales)
          };
        });
      }
      return response;
    });
		return promise;
  }


  getDailyCashSales(): Promise<any> {
    var stmt = `CALL kpi_daily_cash_sales();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data = response.data.map(el => {
          let ts = new Date(el.day);
          return {
            name: ts.getDate().toString(),
            value: parseFloat(el.sales)
          };
        });
      }
      return response;
    });
		return promise;
  }


  getDailyCreditSales(): Promise<any> {
    var stmt = `CALL kpi_daily_credit_sales();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data = response.data.map(el => {
          let ts = new Date(el.day);
          return {
            name: ts.getDate().toString(),
            value: parseFloat(el.sales)
          };
        });
      }
      return response;
    });
		return promise;
  }

  
  getTotalCustomerCredit(): Promise<any> {
    var stmt = `CALL kpi_total_customer_credit();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['total_credit'] = parseFloat(response.data[0]['total_credit']);
      }
      return response;
    });
		return promise;
  }
  
}
