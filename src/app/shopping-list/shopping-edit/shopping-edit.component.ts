import { Store } from '@ngrx/store';
import { Ingredient } from './../../shared/ingredientmodel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

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
   constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex > -1){
        this.editmode = true;
        this.editedItem = stateData.editedIngredient;
        console.log(stateData.editedIngredientIndex);
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

     this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngrediant));
   }
   else{

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

   this.store.dispatch(new ShoppingListActions.DeleteIngredient());
   this.onClear();
  }
}
