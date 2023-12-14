import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import {FoodListModule} from "./food-list.page/food-list.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FoodListModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
