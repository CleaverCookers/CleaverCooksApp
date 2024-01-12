/**
 *  @file      search-page.component.ts
 *  @brief     search page
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

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
  public isLoading: boolean = true;

  /**
   * Cache all the recipes
   */
  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllRecipes().then((data) => {
      this.cachedRecipes = data;
      this.onSearchChanged(null);
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * When search input changed, update the search system (if the name contains the input) (without case)
   * @param $event
   */
  onSearchChanged($event: any) {
    this.recipes = this.cachedRecipes.filter((recipe)=>{
      return recipe.name.toLowerCase().includes(this.search.toLowerCase());
    });
    this.isLoading = false;
  }
}
