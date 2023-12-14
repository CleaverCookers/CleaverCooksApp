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
import {ReceiptsNewPageComponent} from "./pages/receipts-new-page/receipts-new-page.component";
import {ElementPickerComponent} from "./fragments/element-picker/element-picker.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    IngredientsPickerComponent,
    IngredientsAddComponent,
    ReceiptsPageComponent,
    ReceiptsNewPageComponent,
    ElementPickerComponent,
    SearchPageComponent,
    MyIngredientsPageComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
