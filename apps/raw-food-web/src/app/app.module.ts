import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { FoodListModule } from "./food-list/food-list.module";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-list/food-create-dialog/food-create-dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FoodDetailsDialog } from "./food-list/food-details-dialog/food-details-dialog";
import { FoodDeleteAlertDialog } from "./food-list/food-delete-alert-dialog/food-delete-alert-dialog";
import { EffectsModule } from "@ngrx/effects";
import { FoodEffect } from "../../../../libs/app/src/lib/states/foods/food.effect";
import { StoreModule } from "@ngrx/store";
import { foodReducer } from "../../../../libs/app/src/lib/states/foods/foodReducer";

@NgModule({
  declarations: [AppComponent, FoodCreateDialog,FoodDetailsDialog,FoodDeleteAlertDialog],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FoodListModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    EffectsModule.forRoot([FoodEffect]),
    StoreModule.forRoot({foodReducer})
  ],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {hasBackdrop: false}
  },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 6000}
    },],

  bootstrap: [AppComponent],
})
export class AppModule {
}
