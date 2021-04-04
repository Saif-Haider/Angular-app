import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  private recipeService:RecipeService;
  constructor(recipeService:RecipeService) {
    this.recipeService = recipeService;
  }

  ngOnInit(): void {
  }
  onSelected(){
     this.recipeService.recipeselected.emit(this.recipe);
  }

}
