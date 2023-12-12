import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import { FormControl, FormGroup } from "@angular/forms";
import { FoodsService } from "../services/foods.service";
import { lastValueFrom, Subscription } from "rxjs";
import { FoodBo } from "../bos/food.bo";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

export interface FoodForUpdateInterface {
  label: string;
  description: string;
}

@Component({
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
})

export class FoodDetailsModal implements OnInit, OnDestroy {
  @Input() foodId: string;
  public foodDetailsForm: FormGroup;
  private subscription$ = new Subscription();

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private foodService: FoodsService) {
    this.foodDetailsForm = new FormGroup<FoodForUpdateFormGroupInterface>({
        label: new FormControl(''),
        description: new FormControl('')
      }
    );
  }

  ngOnInit(): void {
    this.getFoodSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public getFoodSubscription() {
    const subscription = this.foodService
      .getFood(this.foodId)
      .subscribe((foodBo: FoodBo) => {
        this.foodDetailsForm.patchValue({
          label: foodBo.label,
          description: foodBo.description
        })
      });
    this.subscription$.add(subscription);
  }

  async dismissModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async updateFood() {
    try {
      await lastValueFrom(this.foodService
        .updateFood(this.foodId, this.foodDetailsForm.value));
      const toast = await this.toastController
        .create({
          message: 'food updated successfully',
          duration: 2000,
          position: 'top'
        })
      toast.present();
      await this.dismissModal();
    } catch (err) {
      console.log(err);
    }
  }
}
