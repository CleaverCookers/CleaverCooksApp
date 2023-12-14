import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CleaverCooksApi } from 'src/app/services/cleaver-cooks-api';
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'app-ingredients-picker',
  templateUrl: './ingredients-picker.component.html',
  styleUrls: ['./ingredients-picker.component.scss']
})
export class IngredientsPickerComponent implements OnInit {
  @Output() onSelectedIngredients: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  constructor(private apollo : Apollo) { }

  public ingredients:Ingredient[] = [];
  public addIngredientShowing = false;

  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllIngredients().then((data) => {
      this.ingredients = data;
    }).catch((error) => {
      console.error(error);
    });
  }

  showAddIngredient(){
    this.addIngredientShowing = !this.addIngredientShowing;
  }

  onIngredientAdded(ingredient:Ingredient){
    console.log("Ingredient added"+ingredient)
    this.ingredients.push(ingredient);
  }

  selectIngredient(ingredient:Ingredient){
    this.onSelectedIngredients.emit(ingredient);
  }
}
