import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recepes: Recipe[] = [
    new Recipe('A test recipe','this is a test','https://www.thehealthsite.com/wp-content/uploads/2018/10/Chicken-biryani-recipe.jpg')

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
