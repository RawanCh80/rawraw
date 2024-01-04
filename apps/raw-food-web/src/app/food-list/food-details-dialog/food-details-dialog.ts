import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { lastValueFrom, Subscription } from "rxjs";
import { FoodBo, FoodForCreationInterface, FoodForUpdateInterface, FoodsService } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-details-dialog.html',
  styleUrls: ['./food-details-dialog.scss'],
})
export class FoodDetailsDialog  implements OnInit, OnDestroy {
  foodId: string;
  public foodDetailsForm: FormGroup;
  private subscription$ = new Subscription();

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
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
  public async dismissDialog() {
    return this.matDialog.closeAll();
  }
  async updateFood() {
    try {
      const foodFormValue = this.foodDetailsForm.value as FoodForUpdateInterface;
      await lastValueFrom(this.foodService.createFood(foodFormValue));
      await this.dismissDialog();
      let snack = this.matSnackBar
        .open('food updated successfully',
        'Close', {
          duration: 5000
        });
    } catch (err) {
      let snackBar = this.matSnackBar.open('food cannot be updated');
      console.error();
    }
  }
}
