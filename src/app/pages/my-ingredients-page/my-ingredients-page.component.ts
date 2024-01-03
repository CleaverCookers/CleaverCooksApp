import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {LocalCookerPreferences} from "../../services/local-cooker-preferences";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  AddIngredientBottomSheetComponent
} from "../../fragments/add-ingredient-bottom-sheet/add-ingredient-bottom-sheet.component";

@Component({
  selector: 'app-my-ingredients-page',
  templateUrl: './my-ingredients-page.component.html',
  styleUrls: ['./my-ingredients-page.component.scss']
})
export class MyIngredientsPageComponent implements OnInit {
  constructor(private apollo : Apollo, private bottomSheet: MatBottomSheet) { }

  public ingredients:any[] = [];

  async ngOnInit(): Promise<void> {
    let allIngredients = await new CleaverCooksApi(this.apollo).getAllIngredients();
    this.ingredients = LocalCookerPreferences.getMyIngredients(allIngredients);
  }

  showAddIngredientBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(AddIngredientBottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((ingredient)=>{
      if(ingredient != undefined){
        this.ingredients.push(ingredient);
        LocalCookerPreferences.setMyIngredients(this.ingredients);
      }
    });
  }
}
