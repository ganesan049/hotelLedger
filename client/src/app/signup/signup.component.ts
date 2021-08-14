import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public alertMessages = false;
  msgs: string = "";
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _service:ServiceService,private api:BackendService, private router:Router) {
    this.loginForm = this.fb.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
    });
   }

   ngOnInit() {
    if(sessionStorage.getItem('name') || sessionStorage.getItem('token')){
      window.sessionStorage.clear();
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
      "name": data.name,
      "password": encyptionData,
    }
    this.api.signUp(credentials).subscribe(
      data => {
        this.router.navigate(['/login']);
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
