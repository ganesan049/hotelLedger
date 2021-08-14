import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChipsComponent } from './chips/chips.component';
import { CardComponent } from './card/card.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { ServiceService } from './shared/service.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { AddItemComponent } from './add-item/add-item.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddExpenseItemComponent } from './add-expense-item/add-expense-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChipsComponent,
    CardComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyTokenComponent,
    AddItemComponent,
    AddOrderComponent,
    ExpenseComponent,
    AddExpenseComponent,
    AddExpenseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [ServiceService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
