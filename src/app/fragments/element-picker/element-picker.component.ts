import {Component, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {FormBuilder} from "@angular/forms";
import {Element} from "../../models/element";
import {MatDialogRef} from "@angular/material/dialog";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-element-picker',
  templateUrl: './element-picker.component.html',
  styleUrls: ['./element-picker.component.scss']
})
export class ElementPickerComponent {
  constructor(private formBuilder: FormBuilder,public dialogRef: MatBottomSheetRef<ElementPickerComponent,Element>) {
  }
  public ingredient:Ingredient|undefined;
  public form = this.formBuilder.group({
    quantity: '30 g',
  });
  public pickerDisplayed = false

  changeIngredient(ingredient:Ingredient){
    this.ingredient = ingredient;
    this.pickerDisplayed = false;
  }

  onSubmit() {
    if(this.form.value.quantity == null || this.ingredient == undefined) return;
    let element = new Element(this.form.value.quantity!!,this.ingredient!!)
    this.dialogRef.dismiss(element);
  }
}
