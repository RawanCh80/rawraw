import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { FoodListModule } from "./food-list/food-list.module";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-list/food-create-dialog/food-create-dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [AppComponent,FoodCreateDialog],
  imports: [
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
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {hasBackdrop: false}},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 6000}
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
