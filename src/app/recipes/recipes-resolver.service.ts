import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// This service helps to load the the data before a route is loaded
// its automatically subscribe to the observer
// Also need to add this to route where it should work
export class RecipesResolverService implements Resolve <Recipe[]>{

  constructor(private dsservice:DataStorageService,private recipeService:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    // only resove if not already loaded otherwise existing data
    // will be overriden each time incase we edit or delete
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.dsservice.fetchData();
    }
    else{
      return recipes;
    }

  }
}
