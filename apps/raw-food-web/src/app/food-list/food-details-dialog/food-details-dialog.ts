import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { lastValueFrom, Subscription } from "rxjs";
import { FoodBo, FoodsService } from "@rawraw/app";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-details-dialog.html',
  styleUrls: ['./food-details-dialog.scss'],
})
export class FoodDetailsDialog implements OnInit, OnDestroy {
  public foodDetailsForm: FormGroup;
  private subscription$ = new Subscription();

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private foodService: FoodsService,
    @Inject(MAT_DIALOG_DATA) public data: { foodId: string }) {
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
      .getFood(this.data.foodId)
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
      await lastValueFrom(this.foodService
        .updateFood(this.data.foodId, this.foodDetailsForm.value));
      this.matSnackBar.open('food updated successfully',
        'Close', {
          duration: 2000
        });
      await this.dismissDialog();
    } catch (err) {
      this.matSnackBar.open('food cannot be updated');
      console.error('');
    }
  }
}
