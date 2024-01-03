import {Ingredient} from "../models/ingredient";

export class LocalCookerPreferences{
  public static getMyIngredients(allIngredients:Ingredient[]):Ingredient[]{
    let ingredients = localStorage.getItem("myIngredients");
    if (ingredients == null) return [];
    return JSON.parse(ingredients).map((id: string) => {
      return allIngredients.find((ingredient) => {
        return ingredient.id == id;
      });
    }).filter((ingredient:Ingredient|undefined) => {
      return ingredient != undefined;
    });
  }
  public static setMyIngredients(ingredients:Ingredient[]){
    localStorage.setItem("myIngredients", JSON.stringify(ingredients.map((ingredient) => {
      return ingredient.id;
    })));
  }
}
