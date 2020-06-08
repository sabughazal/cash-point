import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/pages/home/home.page';
import { SuppliersPage } from 'src/pages/suppliers/suppliers.page';
import { CustomersPage } from 'src/pages/customers/customers.page';
import { StockPage } from 'src/pages/stock/stock.page';
import { SalesPage } from 'src/pages/sales/sales.page';
import { CustomerPage } from 'src/pages/customer/customer.page';
import { SupplierPage } from 'src/pages/supplier/supplier.page';
import { NewPurchasePage } from 'src/pages/new-purchase/new-purchase.page';
import { ProductPage } from 'src/pages/product/product.page';
import { DashboardPage } from 'src/pages/dashboard/dashboard.page';
import { ExpensesPage } from 'src/pages/expenses/expenses.page';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePage },
  { path: 'customers/:id', component: CustomerPage },
  { path: 'customers', component: CustomersPage },
  { path: 'suppliers/:id', component: SupplierPage },
  { path: 'suppliers', component: SuppliersPage },
  { path: 'suppliers/:id/new-purchase', component: NewPurchasePage },
  { path: 'stock', component: StockPage },
  { path: 'stock/product/:id', component: ProductPage },
  { path: 'sales', component: SalesPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'expenses', component: ExpensesPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
