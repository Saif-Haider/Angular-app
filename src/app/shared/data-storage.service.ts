import { Recipe } from './../recipes/recipe.model';
import { RecipeConstants } from './url.enum';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,private recipeService:RecipeService) { }

  storeRecipe(){
   const recipes = this.recipeService.getRecipes();
   this.http.put(RecipeConstants.FIREBASE_ENDPOINT + RecipeConstants.FIREBASE_DOCUMENT,recipes).subscribe();
  }

  fetchData(){
    this.http.get<Recipe[]>(RecipeConstants.FIREBASE_ENDPOINT+RecipeConstants.FIREBASE_DOCUMENT).subscribe(
      (recipes )=>{
        this.recipeService.setRecipes(recipes);
      }
      )
  }

}
