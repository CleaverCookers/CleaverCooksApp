import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apollo:Apollo) { }

  form = this.formBuilder.group({
    title: ''
  });

  ngOnInit(): void {
  }

  onSubmit(){
    new CleaverCooksApi(this.apollo).addIngredient(this.form.value.title!);
  }
}
