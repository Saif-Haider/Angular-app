import { Store } from '@ngrx/store';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredientmodel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from './../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
   subscription:Subscription;
   editmode:Boolean=false;

   editedItem:Ingredient;
   constructor(private shoppingListService:ShoppingListService,private store:Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex > -1){
        this.editmode = true;
        this.editedItem = stateData.editedIngredient;
         this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
      else{
        this.editmode = false;
      }
    });

  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form:NgForm){
   const value = form.value;
   const newIngrediant = new Ingredient(value.name,value.amount);
   if(this.editmode){
     //this.shoppingListService.updateIngrediant(this.editedItemIndex,newIngrediant);
     this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngrediant));
   }
   else{
    //this.shoppingListService.addIngrediant(newIngrediant);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngrediant));
   }
   this.editmode =false;
   form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editmode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete(){
   // this.shoppingListService.deleteIngrediant(this.editedItemIndex);
   this.store.dispatch(new ShoppingListActions.DeleteIngredient());
   this.onClear();
  }
}
