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
import { StockCountComponent } from './stock-count/stock-count.component';
import { ProductPackagesComponent } from './product-packages/product-packages.component';

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
    ProductPackagesComponent
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
    NewItemComponent
  ],
  providers: [
    HttpClient,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
