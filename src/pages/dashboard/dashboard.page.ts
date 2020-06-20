import { Component, OnInit } from '@angular/core';
import { KpiService } from 'src/services/kpi/kpi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit {

  todayCashSales: number = 0;
  todayCreditSales: number = 0;
  todayTotalPurchases: number = 0;

  constructor(
    private kpiService: KpiService
  ) { }

  ngOnInit() {
    this.loadSalesStatistics();
    this.loadPurchasesStatistics();
  }

  private loadSalesStatistics() {
    this.kpiService.getTodaySalesStatistics().then(response => {
      if (response.data[0]['today_cash_sales']) {
        this.todayCashSales = response.data[0]['today_cash_sales'];
      }
      if (response.data[0]['today_credit_sales']) {
        this.todayCreditSales = response.data[0]['today_credit_sales'];
      }
    });
  }

  private loadPurchasesStatistics() {
    this.kpiService.getTodayPurchasesStatistics().then(response => {
      if (response.data[0]['today_total_purchases']) {
        this.todayTotalPurchases = response.data[0]['today_total_purchases'];
      }
    });
  }

}
