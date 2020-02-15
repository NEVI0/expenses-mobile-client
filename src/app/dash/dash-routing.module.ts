import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashPage } from './dash.page';
import { AccountPage } from './account/account.page';

const routes: Routes = [
    { path: '', component: DashPage },
    { path: 'account', component: AccountPage }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule],
})

export class DashPageRoutingModule {}
