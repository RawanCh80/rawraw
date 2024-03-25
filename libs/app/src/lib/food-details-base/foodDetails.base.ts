import { Subscription } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import {
  FOOD_DETAILS_KEY,
  FoodActions,
  FoodDetailsStatusEnum,
  FoodForCreationInterface,
  selectFoodDetails
} from "@rawraw/app";
import { inject } from "@angular/core";

interface FoodFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

export abstract class FoodDetailsBase {
  protected store = inject(Store);
  protected subscription$ = new Subscription();
  protected foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));
  protected foodDetailsForm: FormGroup;
  protected isEditMode: boolean;
  protected foodId: string;

  protected constructor() {
    this.foodDetailsForm = new FormGroup<FoodFormGroupInterface>({
        label: new FormControl(''),
        description: new FormControl('')
      }
    );
  }

  protected loadPage() {
    this.isEditMode = !!this.foodId;
    if (this.isEditMode) {
      this.store.dispatch(FoodActions.loadFoodDetails({
          foodId: this.foodId
        })
      );
    }
  }

  protected dispatchUpdateFood() {
    this.store.dispatch(FoodActions.updateFood({
          foodId: this.foodId,
          foodFormDetailsValue: this.foodDetailsForm.value
        }
      )
    );
  }

  protected dispatchCreateFood() {
    const foodFormValue = this.foodDetailsForm.value as FoodForCreationInterface;
    this.store.dispatch(FoodActions.createFood({
        food: foodFormValue
      })
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
              this.presentToast('food updated successfully', 3000);
              await this.dismissModal();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.updateError) {
              this.presentToast('food cannot be updated', 3000);
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.createSuccess) {
              this.presentToast('food created successfully', 3000);
              await this.dismissModal();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.createError) {
              this.presentToast('food cannot be created', 3000);
            }
          }
        }
      )
    );
  }

  protected abstract presentToast(message: string, duration: number): Promise<void> | void;

  protected abstract dismissModal(): Promise<void> | Promise<boolean>;

}
