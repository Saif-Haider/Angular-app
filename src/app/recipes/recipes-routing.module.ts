import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGuardService } from './../auth/auth.guard.service';
import { RecipesComponent } from './recipes.component';
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";

const routes:Routes = [  {path: '' ,component:RecipesComponent ,canActivate:[AuthGuardService] ,children:[
  {path:'',component:RecipeStartComponent},
  {path:'new',component:RecipeEditComponent},
  {path:':id',component:RecipeDetailComponent,resolve:[RecipesResolverService]},
  {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolverService]}
]},];
@NgModule({
 imports:[RouterModule.forChild(routes)],
 exports:[
  RouterModule
 ]
})
export class RecipesRoutingModule{

}