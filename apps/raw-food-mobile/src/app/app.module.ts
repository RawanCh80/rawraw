import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FoodDetailsModal } from './food-list/food-details-modal/food-details.modal';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  FOOD_DETAILS_KEY,
  FOOD_KEY,
  foodDetailsReducers,
  FoodEffect,
  foodReducers,
  provideBootstrapEffects
} from '@rawraw/app';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatCard } from "@angular/material/card";

@NgModule({
  declarations: [AppComponent, FoodDetailsModal],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
        [FOOD_KEY]: foodReducers,
        [FOOD_DETAILS_KEY]: foodDetailsReducers
      },
      {
        runtimeChecks: {
          strictActionTypeUniqueness: true,
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }),
    StoreDevtoolsModule.instrument({
      name: 'RawRawFoodMobile',
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    MatCard,
  ],
  providers: [
    provideBootstrapEffects([FoodEffect]),
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
