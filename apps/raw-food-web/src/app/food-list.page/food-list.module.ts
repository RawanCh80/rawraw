import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodListPage } from "./food-list.page";
import { FormsModule } from "@angular/forms";
import { FoodListRoutingModule } from "./food-list-routing.module";


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    FoodListRoutingModule
  ],
  declarations: [FoodListPage]

})
export class FoodListModule {
}
