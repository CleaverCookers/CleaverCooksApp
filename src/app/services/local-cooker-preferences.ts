/**
 *  @file      local-cooker-preferences.ts
 *  @brief     used to local prefeences
 *  @author    Created by Eliott Jaquier
 *  @version   03.01.2024
 */

import {Ingredient} from "../models/ingredient";

/**
 * A class that allows the user to store their preferences locally.
 */
export class LocalCookerPreferences{
  public static getMyIngredients(allIngredients:Ingredient[]):Ingredient[]{
    return LocalCookerPreferences.getMyIngredientsLocalIds().map((id: string) => {
      return allIngredients.find((ingredient) => {
        return ingredient.id == id;
      });
    }).filter((ingredient:Ingredient|undefined) => {
      return ingredient != undefined;
    });
  }
  public static getMyIngredientsLocalIds(){
    let ingredients = localStorage.getItem("myIngredients");
    if (ingredients == null) return [];
    return JSON.parse(ingredients);
  }
  public static setMyIngredients(ingredients:Ingredient[]){
    localStorage.setItem("myIngredients", JSON.stringify(ingredients.map((ingredient) => {
      return ingredient.id;
    })));
  }
}
