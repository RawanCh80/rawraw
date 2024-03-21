import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FoodDetailsModal } from './food-details-modal/food-details.modal';
import { FoodCreateModal } from './food-create-modal/food-create.modal';
import {
  FOOD_KEY,
  FoodActions,
  FoodDetailsStatusEnum,
  FoodItemBo,
  FoodListBase,
  HttpStatusEnum,
  selectAllFoods,
  selectFoodDetails
} from '@rawraw/app';
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
  public foodListSelected$ = this.store.pipe(select(selectAllFoods));
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  ngOnInit(): void {
    this.foodListSubscription();
    this.store.dispatch(FoodActions.loadFoods());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private foodListSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
          next: async (foodDetailsState) => {
            if (foodDetailsState.status === FoodDetailsStatusEnum.deleteSuccess) {
              const toast = await this.toastController.create({
                message: 'Food deleted successfully',
                duration: 2000,
                position: 'top'
              });
              await toast.present();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.deleteError) {
              const toast = await this.toastController.create({
                message: 'Food cant be deleted ',
                duration: 2000,
                position: 'top'
              });
              await toast.present();
            }
          }
        }
      )
    );
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
            handler: () => {
              this.store.dispatch(FoodActions.deleteFood({foodId: foodId}));
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
          food: foodItemBo
        }
      });
    await modal.present();
  }

  async presentAddFoodModal() {
    const modal = await this.modalController
      .create({
        component: FoodCreateModal
      });
    await modal.present();
  }

  protected readonly HttpStatusEnum = HttpStatusEnum;
  protected readonly FOOD_KEY = FOOD_KEY;
}
