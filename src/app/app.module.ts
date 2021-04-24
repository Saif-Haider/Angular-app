import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipeService } from './recipes/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import {StoreModule} from '@ngrx/store'
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
    SharedModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer})
  ],
  providers: [
   ShoppingListService,
   RecipeService,{
     provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
