import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { IonContent } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { DashService } from '../dash.service';
import { Expense } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss'],
})

export class AllExpensesComponent implements OnInit {

    @ViewChild(IonContent, null) content: IonContent;

    private readonly AppUserData = environment.StorageUserData;

    public expenses$: Observable<Expense[] | any>;
    public searchResults$: Observable<Expense[] | any>;

    public tag = new FormControl();
    public userToken: string;
    public scrollToTop: boolean;

    constructor(
        private dashService: DashService,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.onStart()
    }

    ionViewWillEnter() {
        this.onStart()
    }

    onStart() {
        this.storage.get(this.AppUserData).then(value => {
            const user = JSON.parse(value);

            this.userToken = user.token;
            this.expenses$ = this.dashService.getAllExpenses(user._id, user.token);
            this.searchResults$ = this.tag.valueChanges.pipe(
                map(result => result.trim()),
                debounceTime(250),
                distinctUntilChanged(),
                switchMap(result => this.dashService.search(user._id, result, user.token))
            );
        });
    }

    onRefresh(event) {
        setTimeout(() => {
            this.onStart();
            event.target.complete();
        }, 1500);
    }

    onScrollToTop() {
        this.content.scrollToTop(1500);
    }

}
