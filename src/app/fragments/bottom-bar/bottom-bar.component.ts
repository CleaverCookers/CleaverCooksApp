/**
 *  @file      bottom-bar.component.ts
 *  @brief     bottom bar component
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import { Component, OnInit } from '@angular/core';

/**
 * The bottom bar is the navigation bar at the bottom of the screen used to navigate between pages.
 */
@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
