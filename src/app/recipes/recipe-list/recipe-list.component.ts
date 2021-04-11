import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] ;
  private recipeService: RecipeService;
  private router:Router
  private route:ActivatedRoute;
  // Add Service in constructor
  constructor(recipeService:RecipeService ,  router:Router ,route:ActivatedRoute) {
    this.recipeService = recipeService;
    this.router = router;
    this.route = route;
  }

  // Access Data from services after initialization
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
   this.router.navigate(['new'],{relativeTo: this.route});
  }


}
