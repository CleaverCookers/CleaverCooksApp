/**
 *  @file      element-bottom-sheet.component.ts
 *  @brief     element bottom sheet
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {FormBuilder} from "@angular/forms";
import {Element} from "../../models/element";
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Apollo} from "apollo-angular";

/**
 * A bottom sheet that allows the user to pick an ingredient and quantity. It can be based on an existing element (modify) or create a new one.
 */
@Component({
  selector: 'app-element-picker',
  templateUrl: './element-bottom-sheet.component.html',
  styleUrls: ['./element-bottom-sheet.component.scss']
})
export class ElementBottomSheetComponent {
  constructor(private formBuilder: FormBuilder, public dialogRef: MatBottomSheetRef<ElementBottomSheetComponent, Element>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Element|null) {
    this.ingredient = data?.ingredient;
    this.form = this.formBuilder.group({
      quantity: data?.amount ?? 30,
      unit: data?.unit ?? 'gr'
    });
  }
  public ingredient:Ingredient|undefined;
  public form;
  public pickerDisplayed = false

  /**
   * Change the currently picked ingredient and close the selection picker
   * @param ingredient
   */
  changeIngredient(ingredient:Ingredient){
    this.ingredient = ingredient;
    this.pickerDisplayed = false;
  }

  /**
   * When the form is submitted via the confirmation button, close the dialog and pass the element (quantity + ingredient) to the emitter
   */
  async onSubmit() {
    if (this.form.value.quantity == null || this.ingredient == undefined || this.form.value.unit == null) return;
    this.dialogRef.dismiss(new Element('',this.form.value.quantity, this.form.value.unit,this.ingredient));
  }
}
