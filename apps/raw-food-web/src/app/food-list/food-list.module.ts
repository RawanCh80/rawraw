import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodListPage } from "./food-list.page";
import { FormsModule } from "@angular/forms";
import { FoodListRoutingModule } from "./food-list-routing.module";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { IonicModule } from "@ionic/angular";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    FoodListRoutingModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [FoodListPage]

})
export class FoodListModule {
}
