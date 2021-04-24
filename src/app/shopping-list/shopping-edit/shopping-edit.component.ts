import { Store } from '@ngrx/store';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredientmodel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
   subscription:Subscription;
   editmode:Boolean=false;
   editedItemIndex:number;
   editedItem:Ingredient;
   constructor(private shoppingListService:ShoppingListService,private store:Store<{shoppingList:{ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
       this.editmode = true;
       this.editedItem = this.shoppingListService.getIngrediant(index);
       this.slForm.setValue({
         name:this.editedItem.name,
         amount: this.editedItem.amount
       })
      }
    )
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onAddItem(form:NgForm){
   const value = form.value;
   const newIngrediant = new Ingredient(value.name,value.amount);
   if(this.editmode){
     this.shoppingListService.updateIngrediant(this.editedItemIndex,newIngrediant);
   }
   else{
    //this.shoppingListService.addIngrediant(newIngrediant);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngrediant))
   }
   this.editmode =false;
   form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editmode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngrediant(this.editedItemIndex);
    this.onClear();
  }
}
