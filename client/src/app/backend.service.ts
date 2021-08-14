import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ServiceService } from './shared/service.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiUrl = "http://localhost:5000"
  token = localStorage.getItem('token') || "null";
  constructor(private http: HttpClient, private api:ServiceService) { }

  getOrder(): Observable<any> {
    return this.api.get('/api/order/getOrder');
  }

  addOrder(body:any):Observable<any>{
    return this.api.post('/api/order/addOrder',body);
  }

  deleteOrder(body:any):Observable<any>{
    return this.api.delete('/api/order/deleteOrder',body);
  }

  getExpense(): Observable<any> {
    return this.api.get('/api/expense/getExpense');
  }

  deleteExpenses(body:any):Observable<any>{
    return this.api.delete('/api/expense/deleteExpense',body);
  }

  addExpenses(body:any):Observable<any>{
    return this.api.post('/api/expense/addExpense',body);
  }

  getItems(): Observable<any> {
    return this.api.get('/api/item/getItem');
  }

  addItem(body:any):Observable<any>{
    return this.api.post('/api/item/addItem',body);
  }

  deleteItem(body:any):Observable<any>{
    return this.api.delete('/api/item/deleteItem',body);
  }

  getExpensesItem(): Observable<any> {
    return this.api.get('/api/expense-item/getItem');
  }

  addExpenseItem(body:any):Observable<any>{
    return this.api.post('/api/expense-item/addItem',body);
  }

  deleteExpenseItem(body:any):Observable<any>{
    return this.api.delete('/api/expense-item/deleteItem',body);
  }

  signIn(user:any): Observable<any> {
    let body = {email:user.email,password:user.password}
    return this.api.post('/api/user/signIn',body);
  }

  signUp(user:any): Observable<any> {
    let body = {email:user.email,password:user.password,name:user.name}
    return this.api.post('/api/user/signUp',body);
  }

  forgotPassword(user:any): Observable<any> {
  let body = {email:user.email}
    return this.api.post('/api/user/resetPassword',body);
  }

  verfiyToken(body:any): Observable<any> {
    return this.api.post(`/api/user/reset`,body);
  }
}
