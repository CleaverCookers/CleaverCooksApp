import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Recipe} from "../../models/recipe";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {LocalCookerPreferences} from "../../services/local-cooker-preferences";

/**
 * The page that allows the user to search for recipes.
 */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private apollo:Apollo) { }

  public cachedRecipes: Recipe[] = []
  public recipes: Recipe[] = []
  public search: string = "";

  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllRecipes().then((data) => {
      this.cachedRecipes = data;
      this.onSearchChanged(null);
    }).catch((error) => {
      console.error(error);
    });
  }

  onSearchChanged($event: any) {
    this.recipes = this.cachedRecipes.filter((recipe)=>{
      return recipe.name.toLowerCase().includes(this.search.toLowerCase());
    });
  }
}
