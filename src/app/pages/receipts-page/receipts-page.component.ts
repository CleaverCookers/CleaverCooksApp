import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Recipe} from "../../models/recipe";
import {LocalCookerPreferences} from "../../services/local-cooker-preferences";

/**
 * The page that allows the user to view all recipes.
 */
@Component({
  selector: 'app-receipts-page',
  templateUrl: './receipts-page.component.html',
  styleUrls: ['./receipts-page.component.scss']
})
export class ReceiptsPageComponent implements OnInit {

  constructor(private apollo:Apollo) { }

  public recipes: Recipe[] | undefined;

  /**
   * Get the recipes ranked by the number of ingredients I have at home (and show the missing ingredients number if any)
   */
  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getRecipesRankedByIngredients(LocalCookerPreferences.getMyIngredientsLocalIds()).then((data) => {
      this.recipes = data;
    }).catch((error) => {
      console.error(error);
    });
  }

}
