import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() order:any;
  @Input() type:any = "orders";
  @Output() deleteId = new EventEmitter();
  date:string = "";
  amount:Number = 0;
  item:String = "";
  displayedColumns: string[] = ['item', 'quantity', 'amount'];
  dataSource:string[] = [];
  constructor() {
  }

  ngOnInit(): void {
    this.date = moment(this.order.createdAt || new Date()).format("DD/MM/YYYY");
    this.amount = this.order.total;
    this.item = this.order.item;
    this.dataSource = this.order.order;
  }
  deleteOrder(){
    this.deleteId.emit(this.order._id);
  }
}
