import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { IngredientsPickerComponent } from './fragments/ingredients-picker/ingredients-picker.component';
import { IngredientsAddComponent } from './fragments/ingredients-add/ingredients-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ReceiptsPageComponent } from './pages/receipts-page/receipts-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MyIngredientsPageComponent } from './pages/my-ingredients-page/my-ingredients-page.component';
import { BottomBarComponent } from './fragments/bottom-bar/bottom-bar.component';
import { TopBarComponent } from './fragments/top-bar/top-bar.component';
import {CreateNewRecipePage} from "./pages/create-new-recipe-page/create-new-recipe-page";
import {ElementBottomSheetComponent} from "./fragments/element-picker/element-bottom-sheet.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { RecipeEditPageComponent } from './pages/recipe-edit-page/recipe-edit-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { AddIngredientBottomSheetComponent } from './fragments/add-ingredient-bottom-sheet/add-ingredient-bottom-sheet.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    IngredientsPickerComponent,
    IngredientsAddComponent,
    ReceiptsPageComponent,
    CreateNewRecipePage,
    ElementBottomSheetComponent,
    SearchPageComponent,
    MyIngredientsPageComponent,
    BottomBarComponent,
    TopBarComponent,
    RecipeEditPageComponent,
    RecipePageComponent,
    AddIngredientBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
