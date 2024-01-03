import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {FormBuilder} from "@angular/forms";
import {Element} from "../../models/element";
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-element-picker',
  templateUrl: './element-picker.component.html',
  styleUrls: ['./element-picker.component.scss']
})
export class ElementPickerComponent {
  constructor(private formBuilder: FormBuilder, public dialogRef: MatBottomSheetRef<ElementPickerComponent, Element>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Element|null) {
    this.ingredient = data?.ingredient;
    this.form = this.formBuilder.group({
      quantity: data?.amount ?? 30,
    });
  }
  public ingredient:Ingredient|undefined;
  public form;
  public pickerDisplayed = false

  changeIngredient(ingredient:Ingredient){
    this.ingredient = ingredient;
    this.pickerDisplayed = false;
  }

  async onSubmit() {
    if (this.form.value.quantity == null || this.ingredient == undefined) return;
    this.dialogRef.dismiss(new Element('',this.form.value.quantity,this.ingredient));
  }
}
