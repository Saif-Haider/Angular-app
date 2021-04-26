import { StartEdit } from './store/shopping-list.actions';
import { ShoppingListService } from './shopping-list.service';
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
  constructor(private shoppingListService: ShoppingListService,private store:Store<fromShoppingList.AppState>) { }

  // initialisation in ngOnInit
  ngOnInit(): void {
  //  this.ingredients = this.shoppingListService.getIngrediants();
  //  this.igChangeSub = this.shoppingListService.ingrediantChanged.subscribe(
  //    (ingrediants:Ingredient[]) =>{
  //      this.ingredients = ingrediants;
  //    }
  //  );
   this.ingredients =  this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
