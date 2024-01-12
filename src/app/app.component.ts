/**
 *  @file      app.component.ts
 *  @brief     app component
 *  @author    Created by Eliott Jaquier
 *  @version   03.01.2024
 */

import { Component } from '@angular/core';
import {Capacitor} from "@capacitor/core";
import { App } from '@capacitor/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CleaverCooksApp';

  ngOnInit() {
    if (Capacitor.getPlatform() === 'android') this.registerAndroidListener();
  }

  registerAndroidListener() {
    App.addListener('backButton', (data) => {
      if (data.canGoBack) window.history.back();
      else App.exitApp();
    });
  }
}
