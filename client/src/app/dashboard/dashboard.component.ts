import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BackendService } from '../backend.service';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  orders:Array<order> = [];
  expenses:Array<order> = [];
  sourceOrders:Array<order> = [];
  sourceExpenses:Array<order> = [];
  constructor(private api: BackendService, private router:Router,private _service:ServiceService) { }
  isLoggedIn = false;
  // img:any='';
  name:any='';
  totalOrderAmount:Number = 0;
  totalExpenseAmount:Number = 0;
  ngOnInit(): void {
    this.isLoggedIn = this._service.loggedIn();
    // this.img = this._service.getImg();
    this.name = this._service.getName();
    this.api.getOrder().subscribe(
      data => {
      if (data) {
        this.orders = data.orders;
        this.sourceOrders = data.orders;
        this.calculateTotal();
      }
    },
    err => {
      console.log(err);
      localStorage.clear();
      this.router.navigate(['/login'])
    }
    )
    this.api.getExpense().subscribe(
      data => {
      if (data) {
        this.expenses = data.expenses;
        this.sourceExpenses = data.expenses;
        this.calculateTotal();
      }
    },
    err => {
      console.log(err);
      localStorage.clear();
      this.router.navigate(['/login'])
    }
    )
  }
  getSourceOrder(){
    this.api.getOrder().subscribe(
      data => {
      if (data) {
        this.sourceOrders = data.orders;
      }
    },
    err => {
      this.router.navigate(['/login'])
    }
    )
  }
  getSourceExpneses(){
    this.api.getExpense().subscribe(
      data => {
      if (data) {
        this.sourceExpenses = data.expenses;
      }
    },
    err => {
      this.router.navigate(['/login'])
    }
    )
  }
  calculateTotal(){
    this.totalOrderAmount = this.orders.reduce((acc,curr:order) => acc+=curr.total,0);
    this.totalExpenseAmount = this.expenses.reduce((acc,curr:order) => acc+=curr.total,0);
  }
  logOut(){
    localStorage.clear();
    this._service.setImg('');
    this._service.setName('');
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
  setData(event:any){
    console.log(event);
    // this.img = event.img;
    this.name = event.name;
    this.isLoggedIn = true;
  }
  openDialog(type:any){
    this.router.navigate([`/add-${type}`])
  }
  filterDate(date:any,type:any){
    console.log(this.sourceExpenses);
    switch (type) {
      case 'expenses':
        this.expenses = this.sourceExpenses.filter(order => {
          let orderDate = moment(order.createdAt).format('YYYY-MM-DD');
          switch (date.value.toLowerCase()) {
            case 'today':
              case 'yesterday':
              return moment(orderDate).isSame(date.startDate);
              case 'week':
              case 'month':
              return moment(orderDate).isBetween(date.startDate,date.endDate,
                null, // can be year, month .... the granularity of your comaprison
                '[]');
            default:
              return false;
          }
        });
        break;

      default:
        this.orders = this.sourceOrders.filter(order => {
          let orderDate = moment(order.createdAt).format('YYYY-MM-DD');
          switch (date.value.toLowerCase()) {
            case 'today':
              case 'yesterday':
              return moment(orderDate).isSame(date.startDate);
              case 'week':
              case 'month':
              return moment(orderDate).isBetween(date.startDate,date.endDate,
                null, // can be year, month .... the granularity of your comaprison
                '[]');
            default:
              return false;
          }
        });
        break;
    }

    this.calculateTotal();
  }
  deleteOrder(_id:any,type:any){
    switch (type) {
      case 'expenses':
        this.api.deleteExpenses({_id}).subscribe(
          res => {
            this.expenses = this.expenses.filter(order => order._id != _id);
            this.calculateTotal();
            this.getSourceExpneses();
          },
          err => {
            console.log(err)
          }
        )
        break;

      default:
        this.api.deleteOrder({_id}).subscribe(
          res => {
            this.orders = this.orders.filter(order => order._id != _id);
            this.calculateTotal();
            this.getSourceOrder();
          },
          err => {
            console.log(err)
          }
        )
        break;
    }
  }
}
export interface order {
  createdAt:string,
  total:number,
  _id:string
}
