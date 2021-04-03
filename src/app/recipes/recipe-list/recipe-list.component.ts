import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chicken Biryani','this is a biryani','https://www.thehealthsite.com/wp-content/uploads/2018/10/Chicken-biryani-recipe.jpg'),
    new Recipe('Chicken Manchurian ','this is a Chicken Manchurian ',
    'https://www.cooktube.in/wp-content/uploads/2018/05/chicken-manchurian.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
