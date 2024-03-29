/**
 *  @file      ingredients-add.component.ts
 *  @brief     ingredients add component
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Apollo} from "apollo-angular";
import {Ingredient} from "../../models/ingredient";

/**
 * A simple form to add an ingredient.
 */
@Component({
  selector: 'app-ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent implements OnInit {
  @Output() onSubmittedIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  constructor(private formBuilder: FormBuilder, private apollo:Apollo) { }

  form = this.formBuilder.group({
    title: ''
  });

  ngOnInit(): void {
  }

  /**
   * When the add ingredient button pressed, create a new ingredient from the form title value and emit an event
   */
  async onSubmit() {
    let createdIngredient = await new CleaverCooksApi(this.apollo).createIngredient(this.form.value.title!);
    this.onSubmittedIngredient.emit(createdIngredient)
  }
}
