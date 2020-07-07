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

  
  getTodayCustomerPayments(): Promise<any> {
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


  get30DaySalesMargin(): Promise<any> {
    var stmt = `CALL kpi_30day_sales_margin();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['sales_margin'] = parseFloat(response.data[0]['sales_margin']);
      }
      return response;
    });
		return promise;
  }


  get30DayFreshSalesMargin(): Promise<any> {
    var stmt = `CALL kpi_30day_fresh_sales_margin();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['sales_margin'] = parseFloat(response.data[0]['sales_margin']);
      }
      return response;
    });
		return promise;
  }


  get30DayOtherSalesMargin(): Promise<any> {
    var stmt = `CALL kpi_30day_other_sales_margin();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data[0]['sales_margin'] = parseFloat(response.data[0]['sales_margin']);
      }
      return response;
    });
		return promise;
  }


  get30DaySales(): Promise<any> {
    var stmt = `CALL kpi_30day_sales();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data.forEach(el => {
          el['total_sales'] = parseFloat(el['total_sales']);
          el['cash_sales'] = parseFloat(el['cash_sales']);
          el['credit_sales'] = parseFloat(el['credit_sales']);
          el['fresh_sales'] = parseFloat(el['fresh_sales']);
          el['day'] = new Date(el['day']).getDate().toString();
        });
      }
      return response;
    });
		return promise;
  }

  
  getTodaySalesPerCategory(): Promise<any> {
    var stmt = `CALL kpi_today_sales_per_category();`;
		let options = {
      params: {
        query: stmt
      }
    };
    var promise = this.http.get(endpoint, options).toPromise();
    promise.then((response: any) => {
      if (response.data[0]) {
        response.data.forEach(el => {
          el['total'] = parseFloat(el['total']);
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

  
  getTotalSupplierCredit(): Promise<any> {
    var stmt = `CALL kpi_total_supplier_credit();`;
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
