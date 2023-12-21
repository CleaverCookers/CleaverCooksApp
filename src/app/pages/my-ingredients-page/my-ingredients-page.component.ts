import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";

@Component({
  selector: 'app-my-ingredients-page',
  templateUrl: './my-ingredients-page.component.html',
  styleUrls: ['./my-ingredients-page.component.scss']
})
export class MyIngredientsPageComponent implements OnInit {
  constructor(private apollo : Apollo) { }

  public ingredients:any[] = [];

  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllIngredients().then((data) => {
      console.log(data);
      this.ingredients = data;
    }).catch((error) => {
      console.error(error);
    });
  }
}
