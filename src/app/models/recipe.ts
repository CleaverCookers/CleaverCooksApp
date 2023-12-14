import {Ingredient} from "./ingredient";
import {Element} from "./element";

/**
 * A recipe is a series of instructions linked with ingredients (the link includes their quantity).
 */
export class Recipe {
  constructor(public id: string, public name: string, public description: string, public elements: Element[]) {
  }
}
