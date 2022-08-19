import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumComponent } from './cesium/cesium.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartstestComponent } from './echartstest/echartstest.component';
import * as echarts from 'echarts';

@NgModule({
  declarations: [
    AppComponent,
    CesiumComponent,
    EchartstestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
