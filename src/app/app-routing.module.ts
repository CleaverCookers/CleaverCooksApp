import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {ReceiptsPageComponent} from "./pages/receipts-page/receipts-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {MyIngredientsPageComponent} from "./pages/my-ingredients-page/my-ingredients-page.component";
import {ReceiptsNewPageComponent} from "./pages/receipts-new-page/receipts-new-page.component";

const routes: Routes = [
  { path: 'receipts/new', component : ReceiptsNewPageComponent },
  { path: 'receipts', component : ReceiptsPageComponent },
  { path: 'search', component : SearchPageComponent },
  { path: 'my-ingredients', component : MyIngredientsPageComponent },
  { path: '404', component : NotFoundPageComponent },
  { path: '', redirectTo: '/receipts', pathMatch: 'full' },
  { path: '**', component : NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
