import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:Boolean = false;
  recipeForm: FormGroup;
  constructor(private route:ActivatedRoute,private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        this.editMode = params['id'] !=null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngrediants = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingrediants']){
        for(let ingrediant of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediant.name,Validators.required),
              'amount': new FormControl(ingrediant.amount,[Validators.required,Validators.pattern(/^[1-9+[0-9]*$/)])
            })
          );
        }
      }
    }
   this.recipeForm = new FormGroup({
     'name':new FormControl(recipeName,Validators.required),
     'imagePath':new FormControl(recipeImagePath,Validators.required),
     'description':new FormControl(recipeDescription,Validators.required),
     'ingrediants': recipeIngrediants
   });
  }

  onSubmit(){
   console.log(this.recipeForm);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9+[0-9]*$/)])
      })
    )
  }

}
