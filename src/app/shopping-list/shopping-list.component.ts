import { Ingredient } from './../shared/ingredientmodel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Store} from '@ngrx/store'
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}> ;
  private igChangeSub: Subscription;
  constructor(private store:Store<fromShoppingList.AppState>) { }

  // initialisation in ngOnInit
  ngOnInit(): void {

   this.ingredients =  this.store.select('shoppingList');
  }

  ngOnDestroy(): void {

  }

  onEditItem(index:number){

    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
