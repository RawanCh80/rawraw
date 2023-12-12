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

@NgModule({
  declarations: [AppComponent, FoodDetailsModal, FoodCreateModal],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
