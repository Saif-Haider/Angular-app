import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] ;
  private recipeService: RecipeService;
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // Add Service in constructor
  constructor(recipeService:RecipeService) {
    this.recipeService = recipeService;
  }

  // Access Data from services after initialization
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
