/**
 *  @file      recipe.ts
 *  @brief     Used to construct recipe
 *  @author    Created by Eliott Jaquier
 *  @version   03.01.2024
 */

import {Ingredient} from "./ingredient";
import {Element} from "./element";

/**
 * A recipe is a series of instructions linked with ingredients (the link includes their quantity).
 */
export class Recipe {
  constructor(public id: string, public name: string, public description: string, public instructions: string, public elements: Element[], public missingElements: number | null = null) {
  }
}
