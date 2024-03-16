import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FoodListPage } from './food-list.page';
import { HomePageRoutingModule } from './food-list-routing.module';
import { LetDirective } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LetDirective
  ],
  declarations: [FoodListPage]
})
export class FoodListModule {
}
