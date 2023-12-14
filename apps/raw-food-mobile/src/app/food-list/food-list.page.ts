import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from "@ionic/angular";
import { FoodDetailsModal } from "./food-details-modal/food-details.modal";
import { FoodCreateModal } from "./food-create-modal/food-create.modal";
import { lastValueFrom, Subscription } from "rxjs";
import { FoodItemBo, FoodsService } from "@rawraw/app";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss'],
})
export class FoodListPage implements OnInit, OnDestroy {
  public foodList: FoodItemBo[] = [];
  private subscription$ = new Subscription();

  constructor(private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController,
              private foodService: FoodsService) {
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

  private getFoodListSubscription() {
    const subscription = this.foodService
      .getFoods()
      .subscribe(
        (foodList: FoodItemBo[]) => {
          this.foodList = foodList;
        }
      );
    this.subscription$.add(subscription);
  }
}
