import { Subscription } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { selectFoodDetails } from "@rawraw/app";
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
  protected editMode: boolean;

  protected constructor() {
    this.foodDetailsForm = new FormGroup<FoodFormGroupInterface>({
        label: new FormControl(''),
        description: new FormControl('')
      }
    );
  }

  protected abstract dismissModal(): Promise<void> | Promise<boolean>;

  // protected abstract dispatchUpdateFood(): Promise<void> | void;

  // protected abstract  dispatchCreateFood(): Promise<void>;

  protected abstract foodSelectorSubscription(): void;
}
