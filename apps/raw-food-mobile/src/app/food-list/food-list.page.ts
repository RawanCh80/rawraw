import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from "@ionic/angular";
import { FoodDetailsModal } from "./food-details-modal/food-details.modal";
import { FoodCreateModal } from "./food-create-modal/food-create.modal";
import { lastValueFrom, Observable } from "rxjs";
import { FoodBo, FoodItemBo, FoodListBase, FoodsService } from "@rawraw/app";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../libs/app/src/lib/states/app.state";
import *as FoodActions from "../../../../../libs/app/src/lib/states/foods/food.action";
import * as  FoodSelectors  from "../../../../../libs/app/src/lib/states/foods/food.selector";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss'],
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  http = inject(HttpClient);
  foodApi = inject(FoodsService);
  foods: Observable<FoodBo[]>
  error: Observable<string | null>

  constructor(private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController,
              protected override foodService: FoodsService,
              private store: Store<AppState>) {
    super(foodService);
    this.store.dispatch(FoodActions.loadFood());
    this.foods=this.store.select(FoodSelectors.selectAllFoods)
  }

  ngOnInit(): void {
    this.getFoodListSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  async presentAlertDeleteFood(foodId: string) {
    const alert = await this.alertController
      .create({
        header: 'Delete Item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'DELETE',
            handler: async () => {
              try {
                await lastValueFrom(this.foodService.deleteFood(foodId));
                const toast = await this.toastController
                  .create({
                    message: 'food deleted successfully',
                    duration: 2000,
                    position: 'top'
                  })
                toast.present();
              } catch (err) {
                console.log(err);
              }
            }
          }
        ]
      });
    await alert.present();
  }

  async presentFoodDetailsModal(foodItemBo: FoodItemBo) {
    const modal = await this.modalController
      .create({
        component: FoodDetailsModal,
        componentProps: {
          foodId: foodItemBo.id
        }
      });
    modal.present();
  }

  async presentAddFoodModal() {
    const modal = await this.modalController
      .create({
        component: FoodCreateModal,
      });
    modal.present();
  }
}
