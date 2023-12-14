import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'food-list',
  loadChildren: () => import('./food-list.page/food-list.module').then(m => m.FoodListModule)
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
