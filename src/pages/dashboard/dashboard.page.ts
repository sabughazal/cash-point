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
    domain: ['#D9B700', '#AAAAAA', '#ff9494']
  };
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

  constructor(
    private kpiService: KpiService
  ) { }


  ngOnInit() {
    this.loadSalesStatistics();
    this.loadPurchasesStatistics();
    this.loadCustomerPayments();
    this.loadSupplierPayments();
    this.loadChartData();
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
    this.kpiService.getTodayCustomerPapyments().then(response => {
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


  private loadChartData() {
    return this.kpiService.getDailySales().then(response => {
      var totalSales = response.data;
      return this.kpiService.getDailyCashSales().then(response => {
        var cashSales = response.data;
        return this.kpiService.getDailyCreditSales().then(response => {
          var creditSales = response.data;
          this.salesChartData = [{
            'name': "Total Sales",
            'series': totalSales
          },{
            'name': "Cash Sales",
            'series': cashSales
          },{
            'name': "Credit Sales",
            'series': creditSales
          }];
          var average = totalSales.reduce((acc, curr) => acc + curr.value, 0) / totalSales.length;
          this.refLines[0].value = average;
          this.refLines[0].name = average.toFixed(2);
        });
      });
    });
  }

}
