import {Ingredient} from "./ingredient";

export class Recipe {
  constructor(public id: string, public name: string, public description: string, public ingredients: Ingredient[], public steps: string[], public image: string) {
  }
}
