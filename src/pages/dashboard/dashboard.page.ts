import { Component, OnInit } from '@angular/core';
import { KpiService } from 'src/services/kpi/kpi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit {

  salesChartData: any = [];
  salesChartScheme: any = {
    domain: ['#D9B700', '#ACACAC', '#ff9494', '#008000']
  };
  categoriesColorScheme: any = {
    domain: ['#008000', '#DBDBDB']
  };
  categorySalesChartData = [];
  refLines = [{
    value: null,
    name: null
  }];

  todayCashSales: number = 0;
  todayCreditSales: number = 0;
  todayTotalSales: number = 0;
  todayCashPurchases: number = 0;
  todayCreditPurchases: number = 0;
  todayTotalPurchases: number = 0;
  todayCustomerPayments: number = 0;
  todaySupplierPayments: number = 0;
  todayExpenses: number = 0;
  totalCustomerCredit: number = 0;
  totalSupplierCredit: number = 0;
  overallSalesMargin: number = 0;
  freshSalesMargin: number = 0;
  otherSalesMargin: number = 0;

  constructor(
    private kpiService: KpiService
  ) { }


  ngOnInit() {
    this.loadSalesStatistics();
    this.loadPurchasesStatistics();
    this.loadCustomerPayments();
    this.loadSupplierPayments();
    this.loadChartData();
    this.loadCustomerCredit();
    this.loadExpenses();
    this.loadSupplierrCredit();
    this.loadSalePerCategory();
    this.loadSaleMargin();
  }


  getNetCashFlow(): number {
    return this.todayCashSales + this.todayCustomerPayments - this.todayCashPurchases - this.todaySupplierPayments - this.todayExpenses;
  }


  private loadSalesStatistics() {
    this.kpiService.getTodaySalesStatistics().then(response => {
      if (response.data[0]['today_cash_sales']) {
        this.todayCashSales = response.data[0]['today_cash_sales'];
      }
      if (response.data[0]['today_credit_sales']) {
        this.todayCreditSales = response.data[0]['today_credit_sales'];
      }
      if (response.data[0]['today_total_sales']) {
        this.todayTotalSales = response.data[0]['today_total_sales'];
      }
    });
  }


  private loadPurchasesStatistics() {
    this.kpiService.getTodayPurchasesStatistics().then(response => {
      if (response.data[0]['today_credit_purchases']) {
        this.todayCreditPurchases = response.data[0]['today_credit_purchases'];
      }
      if (response.data[0]['today_cash_purchases']) {
        this.todayCashPurchases = response.data[0]['today_cash_purchases'];
      }
      if (response.data[0]['today_total_purchases']) {
        this.todayTotalPurchases = response.data[0]['today_total_purchases'];
      }
    });
  }


  private loadCustomerPayments() {
    this.kpiService.getTodayCustomerPayments().then(response => {
      if (response.data[0]['total_payments']) {
        this.todayCustomerPayments = response.data[0]['total_payments'];
      }
    });
  }


  private loadSupplierPayments() {
    this.kpiService.getTodaySupplierPayments().then(response => {
      if (response.data[0]['total_payments']) {
        this.todaySupplierPayments = response.data[0]['total_payments'];
      }
    });
  }


  private loadSaleMargin() {
    this.kpiService.get30DaySalesMargin().then(response => {
      if (response.data[0]['sales_margin']) {
        this.overallSalesMargin = response.data[0]['sales_margin'];
      }
    });
    this.kpiService.get30DayFreshSalesMargin().then(response => {
      if (response.data[0]['sales_margin']) {
        this.freshSalesMargin = response.data[0]['sales_margin'];
      }
    });
    this.kpiService.get30DayOtherSalesMargin().then(response => {
      if (response.data[0]['sales_margin']) {
        this.otherSalesMargin = response.data[0]['sales_margin'];
      }
    });
  }


  private loadChartData() {
    var series = [{
      'name': "Total Sales",
      'series': []
    },{
      'name': "Cash Sales",
      'series': []
    },{
      'name': "Credit Sales",
      'series': []
    },{
      'name': "Fresh Sales",
      'series': []
    }];
    return this.kpiService.get30DaySales().then(response => {
      if (response.data) {
        response.data.forEach(el => {
          series[0]['series'].push({ // 0 - Total Sales
            name: el['day'],
            value: el['total_sales']
          });
          series[1]['series'].push({ // 1 - Cash Sales
            name: el['day'],
            value: el['cash_sales']
          });
          series[2]['series'].push({ // 2 - Credit Sales
            name: el['day'],
            value: el['credit_sales']
          });
          series[3]['series'].push({ // 3 - Fresh Sales
            name: el['day'],
            value: el['fresh_sales']
          });
        });
        
        this.salesChartData = series;
        var average = series[0]['series'].reduce((acc, curr) => acc + curr.value, 0) / series[0]['series'].length;
        this.refLines[0].value = average;
        this.refLines[0].name = average.toFixed(2);
      }
    });
  }


  private loadCustomerCredit() {
    this.kpiService.getTotalCustomerCredit().then(response => {
      if (response.data[0]['total_credit']) {
        this.totalCustomerCredit = response.data[0]['total_credit'];
      }
    });
  }


  private loadExpenses() {
    this.kpiService.getTodayExpenses().then(response => {
      if (response.data[0]['total_expenses']) {
        this.todayExpenses = response.data[0]['total_expenses'];
      }
    });
  }


  private loadSupplierrCredit() {
    this.kpiService.getTotalSupplierCredit().then(response => {
      if (response.data[0]['total_credit']) {
        this.totalSupplierCredit = response.data[0]['total_credit'];
      }
    });
  }


  private loadSalePerCategory() {
    this.kpiService.getTodaySalesPerCategory().then(response => {
      if (response.data) {
        this.categorySalesChartData = [
          {
            "name": "Fresh",
            "value": response.data.reduce((acc, curr) => {
              if (['2', '3', '4'].indexOf(curr['category']) != -1) {
                return acc + curr['total'];
              } else return acc;
            }, 0)
          },
          {
            "name": "Other",
            "value": response.data.reduce((acc, curr) => {
              if (['2', '3', '4'].indexOf(curr['category']) == -1) {
                return acc + curr['total'];
              } else return acc;
            }, 0)
          }
        ];
      }
    });
  }

}
