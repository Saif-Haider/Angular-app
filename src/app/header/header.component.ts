import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  subscription:Subscription;
  constructor(private dsService:DataStorageService,private authService:AuthService,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription =  this.store.select('auth').pipe(map(authState =>{
      return authState.user;
    })).subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveData(){
   this.dsService.storeRecipe();
  }

  onFetchData(){
    this.dsService.fetchData().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }


}
