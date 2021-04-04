import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredientmodel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] ;
  constructor(private shoppingListService: ShoppingListService) { }

  // initialisation in ngOnInit
  ngOnInit(): void {
   this.ingredients = this.shoppingListService.getIngrediant();
   this.shoppingListService.ingrediantChanged.subscribe(
     (ingrediants:Ingredient[]) =>{
       this.ingredients = ingrediants;
     }
   )
  }

}
