import { Ingredient } from './../shared/ingredientmodel';
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingrediants:Ingredient[];

  constructor(name: string, description: string, imagepath: string,ingrediants:Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagepath;
    this.ingrediants = ingrediants;
  }
}
