import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class RecipeService{

  recipeselected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Chicken Biryani','this is a biryani','https://www.thehealthsite.com/wp-content/uploads/2018/10/Chicken-biryani-recipe.jpg'),
    new Recipe('Chicken Manchurian ','this is a Chicken Manchurian ',
    'https://www.cooktube.in/wp-content/uploads/2018/05/chicken-manchurian.jpg'),
    new Recipe('Chicken Kabab','this in chicken kabab','http://www.ndtv.com/cooks/images/chicken.seekh.jpg')

  ];

  getRecipes(){
    return this.recipes.slice(); // Returns a copy of array
  }

}