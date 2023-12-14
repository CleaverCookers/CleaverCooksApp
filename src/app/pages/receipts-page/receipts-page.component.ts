import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";

@Component({
  selector: 'app-receipts-page',
  templateUrl: './receipts-page.component.html',
  styleUrls: ['./receipts-page.component.scss']
})
export class ReceiptsPageComponent implements OnInit {

  constructor(private apollo:Apollo) { }

  ngOnInit(): void {
    new CleaverCooksApi(this.apollo).getAllRecipes()
  }

}
