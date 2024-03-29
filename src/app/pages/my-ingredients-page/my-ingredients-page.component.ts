/**
 *  @file      my-ingredients-page.components.ts
 *  @brief     my ingredients page
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {LocalCookerPreferences} from "../../services/local-cooker-preferences";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  AddIngredientBottomSheetComponent
} from "../../fragments/add-ingredient-bottom-sheet/add-ingredient-bottom-sheet.component";
import {Ingredient} from "../../models/ingredient";

/**
 * The page that allows the user to view and edit their ingredients.
 */
@Component({
  selector: 'app-my-ingredients-page',
  templateUrl: './my-ingredients-page.component.html',
  styleUrls: ['./my-ingredients-page.component.scss']
})
export class MyIngredientsPageComponent implements OnInit {
  constructor(private apollo : Apollo, private bottomSheet: MatBottomSheet) { }

  public ingredients:Ingredient[] = [];
  public isLoading = true;

  /**
   * Get the list of my ingredients from the cached local id
   */
  async ngOnInit(): Promise<void> {
    let allIngredients = await new CleaverCooksApi(this.apollo).getAllIngredients();
    this.ingredients = LocalCookerPreferences.getMyIngredients(allIngredients);
    this.isLoading = false;
  }

  /**
   * Open the bottom sheet to add ingredient to my list
   */
  showAddIngredientBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(AddIngredientBottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((ingredient)=>{
      if(ingredient != undefined){
        if(this.ingredients.find((i)=>i.id == ingredient.id) != undefined){
          return;
        }
        this.ingredients.push(ingredient);
        LocalCookerPreferences.setMyIngredients(this.ingredients);
      }
    });
  }

  /**
   * Delete an ingredient from my list
   * @param ingredient
   */
  deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter((i)=>i.id != ingredient.id);
    LocalCookerPreferences.setMyIngredients(this.ingredients);
  }
}
