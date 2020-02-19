import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashPageRoutingModule } from './dash-routing.module';
import { DashPage } from './dash.page';

import { AccountComponent } from './account/account.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { PopoverComponent } from './account/popover/popover.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        DashPageRoutingModule
    ],
    declarations: [
        DashPage,
        AccountComponent,
        AllExpensesComponent,
        HomePageComponent,
        PopoverComponent
    ],
    entryComponents: [
        PopoverComponent
    ]
})

export class DashPageModule {}
