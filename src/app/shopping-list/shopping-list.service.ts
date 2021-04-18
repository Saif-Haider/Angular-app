import { Ingredient } from './../shared/ingredientmodel';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'
@Injectable()
export class ShoppingListService{
  ingrediantChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients:Ingredient[] = [
    new Ingredient('apple',5),
  new Ingredient('tomato',15)
];

 getIngrediants(){
   return this.ingredients.slice();
 }
 getIngrediant(index:number){
  return this.ingredients[index];
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
