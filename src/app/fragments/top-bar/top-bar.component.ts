/**
 *  @file      top-bar.component.ts
 *  @brief     top bar component
 *  @author    Created by Eliott Jaquier, Mikael Juillet
 *  @version   03.01.2024
 */

import {Component, OnInit} from '@angular/core';

/**
 * A top bar showing the app branding
 */
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
