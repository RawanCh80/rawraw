import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FoodForCreationInterface, FoodsService } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

interface FoodForCreationFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-create-dialog.html',
  styleUrl: './food-create-dialog.scss',
})
export class FoodCreateDialog {
  public foodForm = new FormGroup<FoodForCreationFormGroupInterface>({
    label: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });

  constructor(
    public matDialog: MatDialog,
    public matSnackBar: MatSnackBar,
    private foodService: FoodsService) {
  }

  public async dismissDialog() {
    return this.matDialog.closeAll();
  }


  public async createFood() {
    try {
      const foodFormValue = this.foodForm.value as FoodForCreationInterface;
      await lastValueFrom(this.foodService.createFood(foodFormValue));
      await this.dismissDialog();
      let snack=this.matSnackBar
        .open('food created successfully',
          'Close',{
            duration: 3000, // Duration in milliseconds, how long the snackbar will be shown
            horizontalPosition: 'center', // Positioning
            verticalPosition: 'bottom' // Positioning
          });
      snack.onAction().subscribe(() => {
        console.error('The snackbar action was triggered!');
      });
      snack.afterDismissed().subscribe(() => {
        console.error('The snackbar was dismissed');
      });

    } catch (err) {
      console.error();
    }
  }
}
