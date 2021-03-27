import { Ingredient } from './../shared/ingredientmodel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [ new Ingredient('apple',5),
  new Ingredient('tomato',15)
];
  constructor() { }

  ngOnInit(): void {
  }

}
