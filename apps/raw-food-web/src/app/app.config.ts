import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from "@ngrx/store";
import { foodReducers } from '@rawraw/app';
import { provideEffects } from "@ngrx/effects";
import { FoodEffect } from '@rawraw/app';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideStore(),
    provideState({name: 'food', reducer: foodReducers}),
    provideEffects(FoodEffect),
  ],
};
