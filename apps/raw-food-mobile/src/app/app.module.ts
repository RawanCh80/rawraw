import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FoodDetailsModal } from "./food-list/food-details-modal/food-details.modal";
import { ReactiveFormsModule } from "@angular/forms";
import { FoodCreateModal } from "./food-list/food-create-modal/food-create.modal";
import { StoreModule } from "@ngrx/store";
import { FoodEffect } from "../../../../libs/app/src/lib/states/foods/food.effect";
import { EffectsModule } from "@ngrx/effects";
import { foodReducer } from "../../../../libs/app/src/lib/states/foods/foodReducer";

@NgModule({
  declarations: [AppComponent, FoodDetailsModal, FoodCreateModal],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([FoodEffect]),
    StoreModule.forRoot({foodReducer})
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,

  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
