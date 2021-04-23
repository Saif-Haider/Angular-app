import { User } from './user.model';
import { RecipeConstants } from './../shared/url.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? :Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  constructor(private http: HttpClient,private router:Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(RecipeConstants.FIREBASE_AUTH + RecipeConstants.FIREBASE_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError),tap(
      resData=>{
          this.handleAuthentication(resData);
      }
    ));

}

login(email:string,password:string){
  return this.http.post<AuthResponseData>(RecipeConstants.FIREBASE_LOGIN + RecipeConstants.FIREBASE_KEY,{
    email: email,
    password: password,
    returnSecureToken: true
  })
  .pipe(catchError(this.handleError),tap(
    resData=>{
        this.handleAuthentication(resData);
    }
  ));
}

logout(){
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');
  if(this.tokenExpirationTimer){
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}

autoLogout(expirationDuration:number){
 this.tokenExpirationTimer =  setTimeout(()=>{
    this.logout();
  },expirationDuration);
}
autoLogin(){
  const userData: {
    email:string;
    id:string;
    _token: string;
    _tokenExpirationDate:string;
  }
  = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return;
  }

  const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
  if(loadedUser.token){
    this.user.next(loadedUser);
  }
  const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -new Date().getTime();
  this.autoLogout(expirationDuration);
}

private handleError(errorRes:HttpErrorResponse){
  console.log(errorRes.error.error.message);
  let errorMessge:string ='An Unknown Error Occured';
  if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message){
    return throwError(errorMessge);
  }
  console.log(errorRes.error.error.message);
  switch(errorRes.error.error.message){
    case 'EMAIL_NOT_FOUND':
    errorMessge = 'There is no user record corresponding to this identifier. The user may have been deleted.';
    break;
    case 'INVALID_PASSWORD':
    errorMessge = 'The password is invalid or the user does not have a password.';
    break;
    case 'USER_DISABLED':
    errorMessge = 'The user account has been disabled by an administrator.';
    break;
    case 'EMAIL_EXISTS':
    errorMessge = 'Email already registered';
    break;
    default:
    errorMessge='An Unknown Error Occured';
  }

  return throwError(errorMessge);
}

private handleAuthentication(resData:AuthResponseData){
  const expirationDate = new Date(new Date().getTime() +  +resData.expiresIn*1000);
  const user = new User(resData.email,resData.localId,resData.idToken,expirationDate);

  this.user.next(user);
  this.autoLogout(+resData.expiresIn * 1000);
  localStorage.setItem('userData',JSON.stringify(user));
}

}
