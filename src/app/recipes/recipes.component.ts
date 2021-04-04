import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(private recipeService:RecipeService) {

  }

  // Subscribe to the event on init
  ngOnInit(): void {
    this.recipeService.recipeselected.subscribe(
      (recipe:Recipe)=> {
        this.selectedRecipe = recipe;
      }
      )
  }

}
