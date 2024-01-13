/**
 *  @file      recipt-edit-page.component.ts
 *  @brief     recipt edit page
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Element} from "../../models/element";
import {ElementBottomSheetComponent} from "../../fragments/element-picker/element-bottom-sheet.component";
import {Recipe} from "../../models/recipe";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * The page that allows the user to edit a recipe by adding, removing, and editing elements or changing the name and description.
 */
@Component({
  selector: 'app-recipe-edit-page',
  templateUrl: './recipe-edit-page.component.html',
  styleUrls: ['./recipe-edit-page.component.scss']
})
export class RecipeEditPageComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, apollo:Apollo, route: ActivatedRoute,private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar) {
    this.api = new CleaverCooksApi(apollo);
    this.recipe = new Recipe(route.snapshot.params['id'],"","","", null,[]);
    this.form = this.formBuilder.group(this.recipe);
    this.imgUrl = this.recipe.image;
  }

  /**
   * Get the recipe by id and fill the form with initial values
   */
  async ngOnInit(): Promise<void> {
    let recipe = await this.api.getRecipe(this.recipe.id);
    this.isInit = true;
    this.isFound = recipe != null;
    if(this.isFound){
      this.recipe = recipe!;
      this.form = this.formBuilder.group(this.recipe);
    }
  }

  public form;
  public recipe:Recipe;
  public isFound:boolean = false;
  public isInit:boolean = false;
  private imgUrl:string | null = null;

  private api:CleaverCooksApi;

  /**
   * Update the recipe when form submitted
   */
  async onSubmit() {
    if (this.form.value.name == null) return;
    let modifiedRecipe = await this.api.updateRecipe(this.recipe.id, this.form.value.name, this.form.value.description, this.form.value.instructions, this.imgUrl);
    this.recipe.name = modifiedRecipe.name;
    this.recipe.description = modifiedRecipe.description;
    this.recipe.instructions = modifiedRecipe.instructions;
    this.recipe.image = modifiedRecipe.image;
    this.openSnackBar('Recipe Updated', 'OK')
  }

  /**
   * Show the edit element (ingredient with quantity) bottom sheet
   * @param element
   */
  showEditElementBottomSheet(element: Element) {
    const bottomSheetRef = this._bottomSheet.open(ElementBottomSheetComponent, {
        data: element
    });
    bottomSheetRef.afterDismissed().subscribe((elementModified:Element)=>{
      if(elementModified != undefined){
        if(element.ingredient.id == elementModified.ingredient.id) {
          elementModified.id = element.id;
          this.editElement(elementModified).then(()=> {
            element.amount = elementModified.amount;
            element.unit = elementModified.unit;
          });
        }else{
          this.removeElement(element).then(()=> {
            this.addElement(elementModified);
          });
        }
      }
    });
  }

  /**
   * Add ingredient with quantity to the current recipe
   * @param element
   */
  async addElement(element: Element) {
    let elementAdded = await this.api.addIngredientToRecipe(this.recipe.id, element.ingredient.id, element.amount, element.unit);
    this.recipe.elements.push(elementAdded);
  }

  /**
   * Update the element (ingredient + qty) in the Backend
   * @param element
   */
  async editElement(element: Element) {
    let elementAdded = await this.api.updateIngredientInRecipe(element.id, element.amount, element.unit)
  }

  /**
   * Remove an ingredient from the recipe
   * @param element
   */
  async removeElement(element: Element) {
    await this.api.removeIngredientFromRecipe(element.id);
    this.recipe.elements = this.recipe.elements.filter((elementInRecipe) => {
      return elementInRecipe.id != element.id;
    });
  }

  /**
   * Show the bottom sheet to add an ingredient with a quantity to the current recipe
   */
  showNewElementBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(ElementBottomSheetComponent, {
        data: null
    });
    bottomSheetRef.afterDismissed().subscribe((element)=>{
      if(element != undefined)
        this.addElement(element);
    });
  }

  /**
   * Open a confirmation snackbar
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

  onImageUrlChanged(url:string) {
    this.imgUrl = url;
  }
}
