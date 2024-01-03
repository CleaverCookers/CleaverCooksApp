import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Element} from "../../models/element";
import {ElementPickerComponent} from "../../fragments/element-picker/element-picker.component";
import {Recipe} from "../../models/recipe";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-edit-page',
  templateUrl: './recipe-edit-page.component.html',
  styleUrls: ['./recipe-edit-page.component.scss']
})
export class RecipeEditPageComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private apollo:Apollo, private route: ActivatedRoute,private _bottomSheet: MatBottomSheet) {
    this.api = new CleaverCooksApi(this.apollo);
    this.recipe = new Recipe(this.route.snapshot.params['id'],"","","",[]);
    this.form = this.formBuilder.group(this.recipe);
  }
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

  private api:CleaverCooksApi;

  async onSubmit() {
    if (this.form.value.name == null) return;
    let modifiedRecipe = await this.api.updateRecipe(this.recipe.id, this.form.value.name, this.form.value.description, this.form.value.instructions);
    this.recipe.name = modifiedRecipe.name;
    this.recipe.description = modifiedRecipe.description;
    this.recipe.instructions = modifiedRecipe.instructions;
  }

  showEditElementBottomSheet(element: Element) {
    const bottomSheetRef = this._bottomSheet.open(ElementPickerComponent, {
        data: element
    });
    bottomSheetRef.afterDismissed().subscribe((elementModified:Element)=>{
      if(elementModified != undefined){
        if(element.ingredient.id == elementModified.ingredient.id) {
          elementModified.id = element.id;
          this.editElement(elementModified).then(()=> {
            element.amount = elementModified.amount;
          });
        }else{
          this.removeElement(element).then(()=> {
            this.addElement(elementModified);
          });
        }
      }
    });
  }

  async addElement(element: Element) {
    let elementAdded = await this.api.addIngredientToRecipe(this.recipe.id, element.ingredient.id, element.amount);
    this.recipe.elements.push(elementAdded);
  }

  async editElement(element: Element) {
    let elementAdded = await this.api.updateIngredientInRecipe(element.id, element.amount)
  }
  async removeElement(element: Element) {
    await this.api.removeIngredientFromRecipe(element.id);
    this.recipe.elements = this.recipe.elements.filter((elementInRecipe) => {
      return elementInRecipe.id != element.id;
    });
  }

  showNewElementBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(ElementPickerComponent, {
        data: null
    });
    bottomSheetRef.afterDismissed().subscribe((element)=>{
      if(element != undefined)
        this.addElement(element);
    });
  }
}