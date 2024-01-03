import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {ReceiptsPageComponent} from "./pages/receipts-page/receipts-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {MyIngredientsPageComponent} from "./pages/my-ingredients-page/my-ingredients-page.component";
import {CreateNewRecipePage} from "./pages/create-new-recipe-page/create-new-recipe-page";
import {RecipeEditPageComponent} from "./pages/recipe-edit-page/recipe-edit-page.component";
import {RecipePageComponent} from "./pages/recipe-page/recipe-page.component";

const routes: Routes = [
    {path: 'recipes/new', component: CreateNewRecipePage},
    {path: 'recipes/:id/edit', component: RecipeEditPageComponent},
    {path: 'recipes/:id', component: RecipePageComponent},
    {path: 'recipes', component: ReceiptsPageComponent},
    {path: 'search', component: SearchPageComponent},
    {path: 'my-ingredients', component: MyIngredientsPageComponent},
    {path: '404', component: NotFoundPageComponent},
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
