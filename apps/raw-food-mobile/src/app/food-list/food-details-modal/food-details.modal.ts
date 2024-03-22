import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import { FormControl, FormGroup } from "@angular/forms";
import { FoodActions, FoodDetailsStatusEnum, FoodItemBo, selectFoodDetails } from "@rawraw/app";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
})

export class FoodDetailsModal implements OnInit, OnDestroy {
  @Input() food: FoodItemBo;
  public foodDetailsForm: FormGroup;
  private subscription$ = new Subscription();
  protected store = inject(Store);
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  constructor(private modalController: ModalController,
              private toastController: ToastController) {
    this.foodDetailsForm = new FormGroup<FoodForUpdateFormGroupInterface>({
        label: new FormControl(''),
        description: new FormControl('')
      }
    );
  }

  ngOnInit(): void {
    this.foodSelectorSubscription();
    this.store.dispatch(FoodActions.loadFoodDetails({
        foodId: this.food.id,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  async dismissModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  private foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
          next: async (foodDetailsState) => {
            if (foodDetailsState.status === FoodDetailsStatusEnum.loadSuccess) {
              this.foodDetailsForm.patchValue({
                label: this.food.label,
                description: this.food.description
              });
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

  public dispatchUpdateFood() {
    this.store.dispatch(FoodActions.updateFood({
          foodId: this.food.id,
          foodFormDetailsValue: this.foodDetailsForm.value
        }
      )
    );
  }
}
