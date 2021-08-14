import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent  {

  Items:Array<item> = [];

  public alertMessages = false;
  msgs: string = "";
  itemForm: FormGroup;
  total = 0;
  disabled:boolean = true;
  submitted = false;

  constructor(private api:BackendService, private fb: FormBuilder, private router:Router) {
    this.itemForm = this.fb.group({
      'item': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required)
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
      err => {
        console.log(err);
        this.alertMessages = true;
        this.msgs = err.error.e;
      }
    )
  }
  addSelectedItem(item:item){
    this.api.addItem(item).subscribe(
      res => {
        this.alertMessages = false;
        this.getItems();
        this.removeSelectItem();
      },
      ({error}) => {
        console.log(error)
        this.alertMessages = true;
        this.msgs = error.message;
        this.removeSelectItem();
      }
    )
  }
  removeSelectItem(){
    this.itemForm.reset();
  }
  removeSelectedItem(item:item){
    this.api.deleteItem(item).subscribe(
      res => {
        this.getItems();
      },
      err => {
        this.alertMessages = false;
        this.msgs = err.message;
        console.log(err)
      }
    )
  }
}

export interface item{
  item:string,
  amount:number
}
