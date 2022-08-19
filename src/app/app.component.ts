import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cesium-project';
  constructor() {
    window['CESIUM_BASE_URL'] = './assets/cesium';
  }
}
