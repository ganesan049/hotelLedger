import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { ServiceService } from '../shared/service.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.scss']
})
export class VerifyTokenComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  matcher = new MyErrorStateMatcher();
  public alertMessages = false;
  msgs: string = "";
  loginForm: FormGroup;
  submitted = false;
  token:string = "";

  constructor(private fb: FormBuilder, private _service:ServiceService, private router:Router, private route: ActivatedRoute, private api:BackendService  ) {
    this.loginForm =  this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validators: this.checkPasswords })
   }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }
  onSubmit(password:string){
    const obj = {password,token:this.token}
    this.api.verfiyToken(obj).subscribe(
      res => {
        this.msgs = res.message;
        this.showErrorMsg();
        setTimeout(() => {
          this.router.navigate(["/login"])
        }, 2000);
      },
      ({error}) => {
        this.msgs = error.message;
        this.showErrorMsg();
      }
    )
  }
  showErrorMsg() {
    this.alertMessages = true;
  }

  clear() {
    this.alertMessages = false;
  }
}
