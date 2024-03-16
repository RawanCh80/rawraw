import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FoodDetailsModal } from './food-details-modal/food-details.modal';
import { FoodCreateModal } from './food-create-modal/food-create.modal';
import { FOOD_KEY, FoodActions, FoodItemBo, FoodListBase, HttpStatusEnum, selectAllFoods } from '@rawraw/app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LetDirective
  ],
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss']
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  private alertController = inject(AlertController);
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);
  protected store = inject(Store);
  public foodSelected$ = this.store.pipe(select(selectAllFoods));

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
                await toast.present();
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
