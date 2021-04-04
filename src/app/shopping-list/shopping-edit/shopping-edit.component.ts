import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredientmodel';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
   @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef;
   @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;


  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
   const newIngrediant = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
   this.shoppingListService.addIngrediant(newIngrediant);
  }
}
