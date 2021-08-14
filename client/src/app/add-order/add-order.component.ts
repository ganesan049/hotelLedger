import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  Items:Array<item> = [];
  selectedItems:Array<selectedItem> = [];

  public alertMessages = false;
  msgs: string = "";
  itemForm: FormGroup;
  total = 0;
  disabled:boolean = true;
  submitted = false;

  constructor(private api:BackendService, private fb: FormBuilder, private router:Router) {
    this.itemForm = this.fb.group({
      'item': new FormControl({item:'',amount:''}, Validators.required),
      'quantity': new FormControl(0, Validators.required)
    });
   }

   get f(){
     return this.itemForm.controls;
   }

  ngOnInit(): void {
    this.getItems();
  }
  getItems(){
    this.api.getItems().subscribe(
      res => {
        this.Items = res.item;
      },
      ({error}) => {
        console.log(error);
        this.alertMessages = true;
        this.msgs = error.message;
      }
    )
  }
  ngOnChanges(){
    this.disabled = this.selectedItems.length == 0;
  }
  addSelectedItem(selectedItem:any){
    let {item:{name,amount},quantity} = selectedItem;
    this.selectedItems.unshift({item:name,amount,quantity});
    this.total = this.selectedItems.reduce((acc,curr) => {
      return acc+(curr.amount * curr.quantity)
    },0);
  this.disabled = this.selectedItems.length == 0;
  this.removeSelectItem();
  }
  removeSelectItem(){
    this.itemForm.reset();
  }
  onSubmit(){
    let obj = {total:this.total,order:this.selectedItems};
    this.api.addOrder(obj).subscribe(
      res => {
        this.alertMessages = true;
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.alertMessages = false;
        this.msgs = err.message;
        this.router.navigate(['/dashboard']);
      }
    )
  }
  removeSelectedItem(index:number){
    this.selectedItems.splice(index,1);
    this.total = this.selectedItems.reduce((acc,curr) => {
      return acc+(curr.amount * curr.quantity)
    },0);
    this.disabled = this.selectedItems.length == 0;
  }
}

export interface item{
  item:string,
  amount:number
}

export interface selectedItem{
  quantity:number,
  item:string,
  amount:number
}

