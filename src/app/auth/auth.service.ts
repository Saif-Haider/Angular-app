import { RecipeConstants } from './../shared/url.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(RecipeConstants.FIREBASE_AUTH + RecipeConstants.FIREBASE_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(errorRes=>{
      console.log(errorRes.error.error.message);
      let errorMessge:string ='An Unknown Error Occured';
      if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message){
        return throwError(errorMessge);
      }
      console.log(errorRes.error.error.message);
      switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND':
        errorMessge = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        case 'INVALID_PASSWORD':
        errorMessge = 'The password is invalid or the user does not have a password.';
        case 'USER_DISABLED':
        errorMessge = 'The user account has been disabled by an administrator.';
        case 'EMAIL_EXISTS':
          errorMessge = 'Email already registered'
      }

      return throwError(errorMessge);

    })
    );

}

login(email:string,password:string){
  return this.http.post<AuthResponseData>(RecipeConstants.FIREBASE_LOGIN + RecipeConstants.FIREBASE_KEY,{
    email: email,
    password: password,
    returnSecureToken: true
  })
}

}
