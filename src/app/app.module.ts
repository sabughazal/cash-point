import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemLookupComponent } from '../components/item-lookup/item-lookup.component';
import { SaleComponent } from '../components/sale/sale.component';
import { NewCustomerComponent } from '../components/new-customer/new-customer.component';
import { NewSupplierComponent } from '../components/new-supplier/new-supplier.component';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { StockCountComponent } from '../components/stock-count/stock-count.component';
import { ProductPackagesComponent } from '../components/product-packages/product-packages.component';
import { NewPaymentComponent } from '../components/new-payment/new-payment.component';

import { CustomerPage } from '../pages/customer/customer.page';
import { SalesPage } from '../pages/sales/sales.page';
import { StockPage } from '../pages/stock/stock.page';
import { SupplierPage } from '../pages/supplier/supplier.page';
import { HomePage } from '../pages/home/home.page';
import { CustomersPage } from '../pages/customers/customers.page';
import { SuppliersPage } from '../pages/suppliers/suppliers.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPurchasePage } from '../pages/new-purchase/new-purchase.page';
import { ProductPage } from '../pages/product/product.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { ExpensesPage } from '../pages/expenses/expenses.page';
import { ItemService } from 'src/services/item/item.service';
import { RefundSaleComponent } from '../components/refund-sale/refund-sale.component';
import { CustomerLookupComponent } from '../components/customer-lookup/customer-lookup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    CustomersPage,
    SuppliersPage,
    ItemLookupComponent,
    SaleComponent,
    SalesPage,
    StockPage,
    CustomerPage,
    NewCustomerComponent,
    SupplierPage,
    NewSupplierComponent,
    NewPurchasePage,
    ProductPage,
    NewItemComponent,
    DashboardPage,
    ExpensesPage,
    StockCountComponent,
    ProductPackagesComponent,
    NewPaymentComponent,
    RefundSaleComponent,
    CustomerLookupComponent
  ],
  imports: [
    NgbModule,
    NgxElectronModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    NewCustomerComponent,
    NewSupplierComponent,
    NewItemComponent,
    NewPaymentComponent,
    ProductPackagesComponent,
    CustomerLookupComponent,
    RefundSaleComponent
  ],
  providers: [
    HttpClient,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
