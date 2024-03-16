import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FoodDetailsModal } from './food-details-modal/food-details.modal';
import { FoodCreateModal } from './food-create-modal/food-create.modal';
import { FOOD_KEY, FoodActions, FoodItemBo, FoodListBase, HttpStatusEnum } from '@rawraw/app';

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss']
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  constructor(private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(FoodActions.loadFoods());
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
                /* await lastValueFrom(this.foodService.deleteFood(foodId));
                 * -->  this.store.dispatch(FoodActions.deleteFood({foodId}));
                 * you need to dispatch the action and show a toast message during the subscribe if successful
                 * I let you write the code for that ya rawraw
                */

                const toast = await this.toastController
                  .create({
                    message: 'food deleted successfully',
                    duration: 2000,
                    position: 'top'
                  });
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
    await modal.present();
  }

  async presentAddFoodModal() {
    const modal = await this.modalController
      .create({
        component: FoodCreateModal
      });
    modal.present();
  }

  protected readonly HttpStatusEnum = HttpStatusEnum;
  protected readonly FOOD_KEY = FOOD_KEY;
}
