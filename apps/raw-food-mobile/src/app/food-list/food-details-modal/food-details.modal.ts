import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FoodActions, FoodDetailsBase } from "@rawraw/app";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})

export class FoodDetailsModal extends FoodDetailsBase implements OnInit, OnDestroy {
  @Input() data: { foodId: string };
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);

  public ngOnInit(): void {
    this.foodId = this.data?.foodId;
    this.loadPage();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected dismissModal() {
    this.store.dispatch(FoodActions.resetFoodDetailsStatus());
    return this.modalController.dismiss(null, 'cancel');
  }

  protected async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    await toast.present();
  }
}
