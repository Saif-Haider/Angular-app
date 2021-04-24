import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes =[
  {path:'', redirectTo: '/recipes',pathMatch:'full'},
  {path:'recipes' , loadChildren: ()=> import('./recipes/recipe.module').then(m => m.RecipesModule)},
  {path:'auth',component:AuthComponent}
];
@NgModule(
  {
    imports :[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports : [RouterModule]
  }
)
export class AppRoutingModule{

}
