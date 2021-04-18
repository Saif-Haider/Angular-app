import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredientmodel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

   constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form:NgForm){
   const value = form.value;
   const newIngrediant = new Ingredient(value.name,value.amount);
   this.shoppingListService.addIngrediant(newIngrediant);
  }
}
