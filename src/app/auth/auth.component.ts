import { AuthService,AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   isLoginMode:Boolean = true;
   isLoading:Boolean = false;
   error:string = null;
  constructor(private authService:AuthService,private router: Router ) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    this.error = null;
    if(!form.valid){
      return ;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObserve : Observable<AuthResponseData>;

    if(!this.isLoginMode){
      this.isLoading = true;
      authObserve =  this.authService.signUp(email,password);
    }
    else{
      authObserve =  this.authService.login(email,password);
    }

    authObserve.subscribe(
      resData =>{
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },errorMessage=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;

      }
    );

    form.reset();
  }
}
