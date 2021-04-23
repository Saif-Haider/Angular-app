import { RecipeConstants } from './../shared/url.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
  }

}
