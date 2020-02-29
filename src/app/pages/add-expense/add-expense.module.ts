import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';

import { AddExpensePageRoutingModule } from './add-expense-routing.module';

import { AddExpensePage } from './add-expense.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        IonicStorageModule.forRoot(),
        AddExpensePageRoutingModule
    ],
    declarations: [ AddExpensePage ]
})

export class AddExpensePageModule {}
