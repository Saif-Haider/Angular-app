import { Ingredient } from './../shared/ingredientmodel';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'
@Injectable()
export class ShoppingListService{
  ingrediantChanged = new Subject<Ingredient[]>();
  private ingredients:Ingredient[] = [
    new Ingredient('apple',5),
  new Ingredient('tomato',15)
];

 getIngrediant(){
   return this.ingredients.slice();
 }
 addIngrediant(ingrediant:Ingredient){
   this.ingredients.push(ingrediant);
   this.ingrediantChanged.next(this.ingredients.slice());
 }
 addIngrediants(ingrediant:Ingredient[]){
   this.ingredients.push(...ingrediant);
   this.ingrediantChanged.next(this.ingredients.slice());
 }

}
