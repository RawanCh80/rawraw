import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { FoodsService } from "@rawraw/app";
import { lastValueFrom } from "rxjs";

interface FoodForCreationFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

export interface FoodForCreationInterface {
  label: string;
  description: string;
}

@Component({
  templateUrl: './food-create.modal.html',
  styleUrls: ['./food-create.modal.scss'],
})
export class FoodCreateModal {
  public foodForm = new FormGroup<FoodForCreationFormGroupInterface>({
    label: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });

  constructor(private modalController: ModalController,
              private toastController:ToastController,
              private foodService: FoodsService) {
  }

  public async dismissModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public async createFood() {
    try {
      const foodFormValue = this.foodForm.value as FoodForCreationInterface;
      await lastValueFrom(this.foodService.createFood(foodFormValue));
      const toast = await this.toastController
        .create({
          message: 'food created successfully',
          duration: 2000,
          position: 'top'
        })
      toast.present();
      await this.dismissModal();

    } catch (err) {
      console.error('Error while adding new item:');
    }
  }
}
