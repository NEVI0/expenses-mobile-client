import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';

import { DashPageRoutingModule } from './dash-routing.module';
import { DashPage } from './dash.page';

import { AccountComponent } from './account/account.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { PopoverComponent } from './account/popover/popover.component';
import { UpdateAccountComponent } from './account/update-account/update-account.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule,
        ChartsModule,
        DashPageRoutingModule,
        IonicStorageModule.forRoot()
    ],
    declarations: [
        DashPage,
        AccountComponent,
        AllExpensesComponent,
        HomePageComponent,
        PopoverComponent,
        UpdateAccountComponent,
        ChartsComponent
    ],
    entryComponents: [
        PopoverComponent,
        UpdateAccountComponent
    ]
})

export class DashPageModule {}
