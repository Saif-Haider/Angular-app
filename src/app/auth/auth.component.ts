import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   isLoginMode:Boolean = true;
   isLoading:Boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return ;
    }

    if(!this.isLoginMode){
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      this.authService.signUp(email,password).subscribe(
        resData =>{
          console.log(resData);
          this.isLoading = false;
        },error=>{
          console.log(error);
          this.isLoading = false;

        }
      );
    }

    form.reset();
  }
}
