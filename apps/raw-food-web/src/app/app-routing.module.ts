import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FoodListPage } from "./food-list/food-list.page";

const routes: Routes = [{
  path: 'food-list',
  component:FoodListPage
  // loadChildren: () => import('./food-list/food-list.module').then(m => m.FoodListModule)
},
  {
    path: '',
    redirectTo: 'food-list',
    pathMatch: 'full'
  },];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
