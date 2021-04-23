import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredientmodel';
import { Recipe } from './recipe.model';
import {  Injectable } from "@angular/core";

@Injectable()
export class RecipeService{
 recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  //  [
  //   new Recipe('Chicken Biryani',
  //   'this is a biryani',
  //   'https://www.thehealthsite.com/wp-content/uploads/2018/10/Chicken-biryani-recipe.jpg',
  //   [
  //     new Ingredient('Chicken',1),
  //     new Ingredient('Rice',1)
  //   ]),
  //   new Recipe('Chicken Manchurian ',
  //   'this is a Chicken Manchurian ',
  //   'https://www.cooktube.in/wp-content/uploads/2018/05/chicken-manchurian.jpg',
  //   [
  //     new Ingredient('Chicken',1),
  //     new Ingredient('Cabbage',1)
  //   ]),
  //   new Recipe('Chicken Kabab',
  //   'this in chicken kabab',
  //   'http://www.ndtv.com/cooks/images/chicken.seekh.jpg',
  //   [
  //     new Ingredient('Chicken',1),
  //     new Ingredient('onion',1)
  //   ])

  // ];
  constructor(private shoppingListService : ShoppingListService){

  }

  getRecipes(){
    return this.recipes.slice(); // Returns a copy of array
  }
  getRecipe(id:number){
    return this.recipes[id];
  }

  addIngrediantToShoppingList(Ingredient:Ingredient[]){
   this.shoppingListService.addIngrediants(Ingredient);
  }
  addRecipe(newRecipe:Recipe){
   this.recipes.push(newRecipe);
   this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(newRecipes:Recipe[]){
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
