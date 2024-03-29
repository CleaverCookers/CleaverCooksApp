/**
 *  @file      recipt-page.component.ts
 *  @brief     recipt page
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Recipe} from "../../models/recipe";

/**
 * The page that allows the user to view a recipe.
 */
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {

  constructor(apollo:Apollo, route: ActivatedRoute, private router:Router) {
    this.api = new CleaverCooksApi(apollo);
    this.recipe = new Recipe(route.snapshot.params['id'],"","","", null,[]);
  }

  public recipe:Recipe;
  public isFound:boolean = false;
  public isInit:boolean = false;
  private api:CleaverCooksApi;

  /**
   * Get the recipe by id to fill the properties
   */
  async ngOnInit(): Promise<void> {
    let recipe = await this.api.getRecipe(this.recipe.id);
    this.isInit = true;
    this.isFound = recipe != null;
    if(this.isFound){
      this.recipe = recipe!;
    }
  }

  /**
   * Delete the current recipe and redirect to the main page
   */
  delete() {
    this.api.deleteRecipe(this.recipe.id).then(()=>{
        this.router.navigate(['recipes']);
    });
  }
}
