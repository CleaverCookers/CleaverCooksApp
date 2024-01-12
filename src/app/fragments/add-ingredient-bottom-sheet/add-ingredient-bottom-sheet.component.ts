/**
 *  @file      add-ingredient-bottom-sheet.component.ts
 *  @brief     ingredient bottom sheet component
 *  @author    Created by Eliott Jaquier
 *  @version   12.01.2024
 */

import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Element} from "../../models/element";
import {Ingredient} from "../../models/ingredient";

/**
 * A simple wrapper for the add ingredient picker to be used as a bottom sheet.
 */
@Component({
  selector: 'app-add-ingredient-bottom-sheet',
  templateUrl: './add-ingredient-bottom-sheet.component.html',
  styleUrls: ['./add-ingredient-bottom-sheet.component.scss']
})
export class AddIngredientBottomSheetComponent implements OnInit {

  constructor(public dialogRef: MatBottomSheetRef<AddIngredientBottomSheetComponent, Ingredient>) { }
  private ingredient:Ingredient|undefined;

  ngOnInit(): void {
  }

  /**
   * Change the currently picked ingredient
   * @param ingredient
   */
  changeIngredient(ingredient: Ingredient) {
    this.ingredient = ingredient;
  }

  /**
   * Validate this bottom sheet and close it (passing the current ingredient to the emitter)
   */
  addIngredient() {
    if (this.ingredient == undefined) return;
    this.dialogRef.dismiss(this.ingredient);
  }
}
