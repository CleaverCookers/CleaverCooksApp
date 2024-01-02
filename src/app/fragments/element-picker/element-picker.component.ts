import {Component, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {FormBuilder} from "@angular/forms";
import {Element} from "../../models/element";
import {MatDialogRef} from "@angular/material/dialog";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-element-picker',
  templateUrl: './element-picker.component.html',
  styleUrls: ['./element-picker.component.scss']
})
export class ElementPickerComponent {
  constructor(private formBuilder: FormBuilder,public dialogRef: MatBottomSheetRef<ElementPickerComponent,Element>, private apollo: Apollo) {
    this.api = new CleaverCooksApi(this.apollo);
  }
  public ingredient:Ingredient|undefined;
  public form = this.formBuilder.group({
    quantity: '30 g',
  });
  public pickerDisplayed = false
  private api:CleaverCooksApi;

  changeIngredient(ingredient:Ingredient){
    this.ingredient = ingredient;
    this.pickerDisplayed = false;
  }

  async onSubmit() {
    if (this.form.value.quantity == null || this.ingredient == undefined) return;
    //new Element(this.form.value.quantity!!,this.ingredient!!)
    let quantity: number = parseFloat(this.form.value.quantity);
    //TODO: Add ingredient to CORRECT recipe
    let element = await this.api.addIngredientToRecipe("1", this.ingredient.id, quantity);
    this.dialogRef.dismiss(element);
  }
}
