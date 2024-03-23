import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import {
  FOOD_DETAILS_KEY,
  FoodActions,
  FoodDetailsBase,
  FoodDetailsStatusEnum,
  FoodForCreationInterface,
  FoodItemBo
} from "@rawraw/app";

@Component({
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
})

export class FoodDetailsModal extends FoodDetailsBase implements OnInit, OnDestroy {
  @Input() food: FoodItemBo;
  @Input() isEditMode: boolean;
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.foodSelectorSubscription();
    if (this?.isEditMode) {
      this.store.dispatch(FoodActions.loadFoodDetails({
          foodId: this.food.id,
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected async dismissModal() {
    this.store.dispatch(FoodActions.resetFoodDetailsStatus());
    return this.modalController.dismiss(null, 'cancel');
  }

  protected dispatchUpdateFood() {
    this.store.dispatch(FoodActions.updateFood({
          foodId: this.food.id,
          foodFormDetailsValue: this.foodDetailsForm.value
        }
      )
    );
  }

  public async dispatchCreateFood() {
    const foodFormValue = this.foodDetailsForm.value as FoodForCreationInterface;
    this.store.dispatch(FoodActions.createFood({
        food: foodFormValue
      })
    );
  }

  protected foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
          next: async (foodDetailsState) => {
            if (foodDetailsState.status === FoodDetailsStatusEnum.loadSuccess) {
              this.foodDetailsForm.patchValue({
                label: foodDetailsState[FOOD_DETAILS_KEY].label,
                description: foodDetailsState[FOOD_DETAILS_KEY].description
              })
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.updateSuccess) {
              const toast = await this.toastController
                .create({
                  message: 'food updated successfully',
                  duration: 2000,
                  position: 'top'
                });
              await toast.present();
              await this.dismissModal();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.updateError) {
              const toast = await this.toastController
                .create({
                  message: 'food cant be updated',
                  duration: 2000,
                  position: 'top'
                });
              await toast.present();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.createSuccess) {
              const toast = await this.toastController
                .create({
                  message: 'food created successfully',
                  duration: 2000,
                  position: 'top'
                })
              await toast.present();
              await this.dismissModal();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.createError) {
              const toast = await this.toastController
                .create({
                  message: 'food cannot be created ',
                  duration: 2000,
                  position: 'top'
                })
              await toast.present();
            }
          }
        }
      )
    );
  }
}
