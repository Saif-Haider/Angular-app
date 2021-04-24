import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[
    RouterModule.forChild([
   {path:'shopping-list',component:ShoppingListComponent}
    ]),
    SharedModule,
    FormsModule
  ]
})
export class ShoppingListModule{

}
