import { Component, OnInit } from '@angular/core';

/**
 * The page that is shown when the user navigates to a page that does not exist.
 */
@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
