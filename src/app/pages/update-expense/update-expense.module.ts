import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateExpensePageRoutingModule } from './update-expense-routing.module';

import { UpdateExpensePage } from './update-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateExpensePageRoutingModule
  ],
  declarations: [UpdateExpensePage]
})
export class UpdateExpensePageModule {}
