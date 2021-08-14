import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseItemComponent } from './add-expense-item/add-expense-item.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'register', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard',canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'reset-token/:token', component: VerifyTokenComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'add-order-item', component: AddItemComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'add-expense-item', component: AddExpenseItemComponent },
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
