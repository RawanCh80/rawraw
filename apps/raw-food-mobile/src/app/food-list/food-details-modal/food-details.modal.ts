import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from "@ionic/angular";
import { FoodActions, FoodDetailsBase } from "@rawraw/app";

@Component({
  templateUrl: './food-details.modal.html',
  styleUrls: ['./food-details.modal.scss'],
})

export class FoodDetailsModal extends FoodDetailsBase implements OnInit, OnDestroy {
  @Input() data: { foodId: string };
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);

  constructor() {
    super();
  }

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
