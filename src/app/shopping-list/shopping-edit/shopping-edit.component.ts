import { Ingredient } from './../../shared/ingredientmodel';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild,Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
   @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef;
   @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;

   @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
   const newIngrediant = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
   this.ingredientAdded.emit(newIngrediant);
  }
}
