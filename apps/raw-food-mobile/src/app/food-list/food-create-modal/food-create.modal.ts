import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { FoodActions, FoodDetailsStatusEnum, FoodForCreationInterface, selectFoodDetails } from "@rawraw/app";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";

interface FoodForCreationFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-create.modal.html',
  styleUrls: ['./food-create.modal.scss'],
})
export class FoodCreateModal implements OnInit, OnDestroy {
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);
  private subscription$ = new Subscription();
  protected store = inject(Store);
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  public foodForm = new FormGroup<FoodForCreationFormGroupInterface>({
    label: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });

  constructor() {
  }

  ngOnInit(): void {
    this.foodSelectorSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public async dismissModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public async createFood() {
    const foodFormValue = this.foodForm.value as FoodForCreationInterface;
    this.store.dispatch(FoodActions.createFood({
      food: foodFormValue
    }));
  }

  private foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
          next: async (foodDetailsState) => {
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
