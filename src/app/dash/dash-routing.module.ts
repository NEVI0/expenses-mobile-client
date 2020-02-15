import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashPage } from './dash.page';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
    { path: '', component: DashPage, children:
        [
            { path: 'account', component: AccountComponent }
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule],
})

export class DashPageRoutingModule {}
