import { Ingredient } from './../shared/ingredientmodel';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class ShoppingListService{
  ingrediantChanged = new EventEmitter<Ingredient[]>();
  private ingredients:Ingredient[] = [
    new Ingredient('apple',5),
  new Ingredient('tomato',15)
];

 getIngrediant(){
   return this.ingredients.slice();
 }
 addIngrediant(ingrediant:Ingredient){
   this.ingredients.push(ingrediant);
   this.ingrediantChanged.emit(this.ingredients.slice());
 }
 addIngrediants(ingrediant:Ingredient[]){
   this.ingredients.push(...ingrediant);
   this.ingrediantChanged.emit(this.ingredients.slice());
 }

}
