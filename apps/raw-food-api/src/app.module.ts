import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { FOOD_KEY, FoodEffect, foodReducer } from '@rawraw/app';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { FoodListModule } from '../../raw-food-web/src/app/food-list/food-list.module';

@NgModule({
  imports: [
    FoodListModule,
    EffectsModule.forRoot(FoodEffect),
    StoreModule.forRoot({ [FOOD_KEY]: foodReducer })],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }]
})
export class AppModule {
}
