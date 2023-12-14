import {Ingredient} from "./ingredient";
import {Element} from "./element";

export class Recipe {
  constructor(public id: string, public title: string, public description: string, public elements: Element[]) {
  }
}
