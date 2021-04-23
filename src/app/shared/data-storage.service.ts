import { Recipe } from './../recipes/recipe.model';
import { RecipeConstants } from './url.enum';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map,tap} from 'rxjs/operators'
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
   return  this.http.get<Recipe[]>(RecipeConstants.FIREBASE_ENDPOINT+RecipeConstants.FIREBASE_DOCUMENT)
    .pipe(map(recipes =>{
        //  1st map is rxjs operator 2nd one is a function on array this
        //  pipe make sure to add ingrients aray to recipe incase it does not
        //  exist in the recipe

      return recipes.map(
        recipe =>{
          return {...recipe,ingrediants:recipe.ingrediants? recipe.ingrediants:[]};
        }

      )
    }),tap(
      (recipes )=>{
      this.recipeService.setRecipes(recipes);
    }))

  }

}
