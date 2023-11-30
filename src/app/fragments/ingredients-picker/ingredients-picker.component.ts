import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CleaverCooksApi } from 'src/app/services/cleaver-cooks-api';

@Component({
  selector: 'app-ingredients-picker',
  templateUrl: './ingredients-picker.component.html',
  styleUrls: ['./ingredients-picker.component.scss']
})
export class IngredientsPickerComponent implements OnInit {

  constructor(private apollo : Apollo) { }
  
  public ingredients = [];

  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllIngredients().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error);
    });
  }

}
