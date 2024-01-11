import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Router} from "@angular/router";

/**
 * The page that allows the user to create a new recipe and redirect to the edit page.
 */
@Component({
  selector: 'app-create-new-recipe-page',
  templateUrl: './create-new-recipe-page.html',
  styleUrls: ['./create-new-recipe-page.scss'],
})
export class CreateNewRecipePage {
  constructor(private formBuilder: FormBuilder, private apollo:Apollo, private router:Router) {
    this.api = new CleaverCooksApi(this.apollo);
  }

  public form = this.formBuilder.group({
    name: '',
    description:'',
  });
  private api:CleaverCooksApi;

  /**
   * When the form is submitted, create the recipe and redirect to the edit page
   */
  async onSubmit() {
      if (this.form.value.name == null) return;
      let recipe = await this.api.createRecipe(this.form.value.name, this.form.value.description, null);
      await this.router.navigate(['recipes', recipe.id, 'edit']);
  }
}
