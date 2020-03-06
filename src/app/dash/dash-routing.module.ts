import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashPage } from './dash.page';

import { AccountComponent } from './account/account.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
    { path: '', component: DashPage, children:
        [
            { path: '', redirectTo: 'home-page', pathMatch: 'full' },
            { path: 'account', component: AccountComponent },
            { path: 'all-expenses', component: AllExpensesComponent },
            { path: 'home-page', component: HomePageComponent },
            { path: 'charts', component: ChartsComponent }
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule],
})

export class DashPageRoutingModule {}
