import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public alertMessages = false;
  msgs: string = "";
  loginForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private _service:ServiceService,private api:BackendService, private router:Router) {
    this.loginForm = this.fb.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
   }

   ngOnInit() {
    if(this._service.getToken()){
      this.router.navigate(["/dashboard"])
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(data:any) {
    this.submitted = true;
    this.clear();
    let encyptionData = this._service.encrypt(data.password);
    let credentials = {
      "email": data.email,
      "password": encyptionData,
    }
    this.api.signIn(credentials).subscribe(
      data => {
        console.log(data)
        this._service.setToken(data.token);
        this._service.setName(data.user.name);
        this._service.setImg(data.user.img);
        this.router.navigate(['/dashboard']);
    },
      error => {
        console.log(error)
        this.msgs = error.error.message;
        this.showErrorMsg();
    });
  }

  showErrorMsg() {
    this.alertMessages = true;
  }

  clear() {
    this.alertMessages = false;
  }

}
