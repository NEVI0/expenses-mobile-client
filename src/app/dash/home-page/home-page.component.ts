import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DashService } from '../dash.service';
import { DataController } from '../../interfaces/DataController';
import { Expense } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

export class HomePageComponent implements OnInit {

    private readonly AppUserData = environment.StorageUserData;

    public userDataCtrl$: Observable<DataController>;
    public lastTenExpense$: Observable<Expense[] | any>;

    public numberOfExpenses: number;
    public userSalary: number;
    public userToken: string;

    constructor(
        private dashService: DashService,
        private storage: Storage,
        private router: Router
    ) {}

    ngOnInit() {
        this.onStart();
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
        this.storage.get(this.AppUserData).then(value => {

            const user = JSON.parse(value);

            this.userToken = user.token;
            this.userSalary = user.salary;

            this.userDataCtrl$ = this.dashService.getUserDataCtrl(user._id, user.token);

            this.lastTenExpense$ = this.dashService.getLastTenExpenses(user._id, user.token).pipe(
                tap(resp => this.numberOfExpenses = resp.length)
            );

        });
    }

    onRefresh(event) {
        setTimeout(() => {
            this.onStart();
            event.target.complete();
        }, 1500);
    }

}
