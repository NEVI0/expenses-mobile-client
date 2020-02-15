import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashPageRoutingModule } from './dash-routing.module';
import { DashPage } from './dash.page';
import { AccountPage } from './account/account.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        DashPageRoutingModule
    ],
    declarations: [
        DashPage,
        AccountPage
    ]
})

export class DashPageModule {}
