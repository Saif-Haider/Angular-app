import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredientmodel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[] ;
  private igChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  // initialisation in ngOnInit
  ngOnInit(): void {
   this.ingredients = this.shoppingListService.getIngrediants();
   this.igChangeSub = this.shoppingListService.ingrediantChanged.subscribe(
     (ingrediants:Ingredient[]) =>{
       this.ingredients = ingrediants;
     }
   )
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

}
