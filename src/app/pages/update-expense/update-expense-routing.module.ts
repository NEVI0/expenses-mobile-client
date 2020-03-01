import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateExpensePage } from './update-expense.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateExpensePageRoutingModule {}
