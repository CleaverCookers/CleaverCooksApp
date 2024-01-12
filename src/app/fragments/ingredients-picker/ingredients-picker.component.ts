/**
 *  @file      ingredients-picker.component.ts
 *  @brief     ingredients picker component
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CleaverCooksApi } from 'src/app/services/cleaver-cooks-api';
import {Ingredient} from "../../models/ingredient";

/**
 * A simple ingredient picker that allows the user to select an ingredient from a list. When an ingredient is selected, it is emitted to the parent component.
 */
@Component({
  selector: 'app-ingredients-picker',
  templateUrl: './ingredients-picker.component.html',
  styleUrls: ['./ingredients-picker.component.scss']
})
export class IngredientsPickerComponent implements OnInit {
  @Output() onSelectedIngredients: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  constructor(private apollo : Apollo) { }

  public ingredients:Ingredient[] = [];
  public addIngredientShowing = false;

  /**
   * Fetch all the ingredients to show the possibilities to the user
   */
  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllIngredients().then((data) => {
      this.ingredients = data;
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * Show the add ingredient form
   */
  showAddIngredient(){
    this.addIngredientShowing = !this.addIngredientShowing;
  }

  /**
   * Event emitter when the add ingredient form has created a new ingredient
   * @param ingredient
   */
  onIngredientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.addIngredientShowing = false
  }

  /**
   * When an ingredient has been chosen, emit an event to the parent
   * @param ingredient
   */
  selectIngredient(ingredient:Ingredient){
    this.onSelectedIngredients.emit(ingredient);
  }
}
