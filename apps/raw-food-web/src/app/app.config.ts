import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from "@ngrx/store";
import { foodReducer } from "../../../../libs/app/src/lib/states/foods/foodReducer";
import { provideEffects } from "@ngrx/effects";
import { FoodEffect } from "../../../../libs/app/src/lib/states/foods/food.effect";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideStore(),
    provideState({name: 'food', reducer: foodReducer}),
    provideEffects(FoodEffect),
  ],
};
