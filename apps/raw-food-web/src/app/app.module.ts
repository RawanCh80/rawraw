import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
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
import {
  FOOD_DETAILS_KEY,
  FOOD_KEY,
  foodDetailsReducers,
  FoodEffect,
  foodReducers,
  provideBootstrapEffects
} from '@rawraw/app';
import { StoreModule } from "@ngrx/store";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [AppComponent, FoodCreateDialog, FoodDetailsDialog, FoodDeleteAlertDialog],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      [FOOD_KEY]: foodReducers,
      [FOOD_DETAILS_KEY]: foodDetailsReducers
    }, {
      runtimeChecks: {
        strictActionTypeUniqueness: true,
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'RawRawFoodWeb',
      maxAge: 25
    }),
    EffectsModule.forRoot([])
  ],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {hasBackdrop: false}
  },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 6000}
    },
    provideBootstrapEffects([FoodEffect]),
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
}
