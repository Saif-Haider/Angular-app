import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  subscription:Subscription;
  constructor(private dsService:DataStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.subscription =  this.authService.user.subscribe(user =>{
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
