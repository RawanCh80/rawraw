import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import { FormControl } from "@angular/forms";
import { FOOD_DETAILS_KEY, FoodActions, FoodDetailsBase, FoodDetailsStatusEnum, FoodItemBo } from "@rawraw/app";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
})

export class FoodDetailsModal extends FoodDetailsBase implements OnInit, OnDestroy {
  @Input() food: FoodItemBo;

  constructor(private modalController: ModalController,
              private toastController: ToastController) {
    super();
  }

  public ngOnInit(): void {
    this.foodSelectorSubscription();
    this.store.dispatch(FoodActions.loadFoodDetails({
        foodId: this.food.id,
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected async dismissModal() {
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
          }
        }
      )
    );
  }
}
