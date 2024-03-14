import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from "@ionic/angular";
import { FoodDetailsModal } from "./food-details-modal/food-details.modal";
import { FoodCreateModal } from "./food-create-modal/food-create.modal";
import { lastValueFrom } from "rxjs";
import { FoodItemBo, FoodListBase, FoodsService } from "@rawraw/app";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import *as FoodActions from "../../../../../libs/app/src/lib/states/foods/food.action";
import { selectAllFoods } from "../../../../../libs/app/src/lib/states/foods/food.selector";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss'],
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  http = inject(HttpClient);
  foodApi = inject(FoodsService);
  public foodSelected$ = this.store.pipe(select(selectAllFoods));

  constructor(private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController,
              protected override foodService: FoodsService,
              private store: Store) {
    super(foodService);
    this.store.dispatch(FoodActions.loadFood());
  }

  ngOnInit(): void {
    this.getFoodListSubscription();
    this.foodSelected$.subscribe({
      next: (foodState) => {
        console.log('...........done');
      }
    })
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
