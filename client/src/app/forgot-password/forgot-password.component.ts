import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public alertMessages = false;
  msgs: string = "";
  loginForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private _service:ServiceService,private api:BackendService, private router:Router) {
    this.loginForm = this.fb.group({
      'email': new FormControl('', Validators.required)
    });
   }

   ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(data:any) {
    this.submitted = true;
    this.clear();
    let credentials = {
      "email": data.email,
    }
    this.api.forgotPassword(credentials).subscribe(
      data => {
        this.msgs = "Please check the mail";
        this.showErrorMsg();
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 2000);
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
