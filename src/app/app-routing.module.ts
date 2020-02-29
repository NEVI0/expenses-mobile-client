import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'dash', pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule )
    },
    {
        path: 'dash',
        loadChildren: () => import('./dash/dash.module').then( m => m.DashPageModule )
    },
    {
        path: 'expense-detail/:id/:token',
        loadChildren: () => import('./pages/expense-detail/expense-detail.module').then( m => m.ExpenseDetailPageModule )
    },
    {
        path: 'add-expense',
        loadChildren: () => import('./pages/add-expense/add-expense.module').then( m => m.AddExpensePageModule )
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
