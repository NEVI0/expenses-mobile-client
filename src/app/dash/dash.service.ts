import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Expense } from '../interfaces/Expense';
import { DataController } from '../interfaces/DataController';

@Injectable({
  providedIn: 'root'
})

export class DashService {

    private readonly OpenedApiUrl = environment.OpenedApiUrl;
    private readonly BlockedApiUrl = environment.BlockedApiUrl;

    private _user = this.authService.user;

    private headers = new HttpHeaders({
        'Authorization': this.authService.user.token
    });

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {}

    get user() {
        return this._user;
    }

    getAllExpenses() {
        return this.http.get<Expense[]>(`${this.BlockedApiUrl}/expenses/${this.authService.user._id}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
    }

    getLastTenExpenses() {
        return this.http.get<Expense[]>(`${this.BlockedApiUrl}/lastExpenses/${this.authService.user._id}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
    }

    getOnlyOneExpense(_id: string) {
        return this.http.get<Expense>(`${this.BlockedApiUrl}/expense/${_id}`, {
			headers: this.headers
		}).pipe(
            take(1)
        );
    }

    getUserDataCtrl() {
        return this.http.get<DataController>(`${this.BlockedApiUrl}/dataController/${this.authService.user._id}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
    }

    createExpense(body: JSON) {
        return this.http.post(`${this.BlockedApiUrl}/expenses/`, body, {
			headers: this.headers
		}).pipe(
            take(1)
        );
    }

    updateExpense(body: JSON, _id: string) {
        return this.http.put<Expense>(`${this.BlockedApiUrl}/expenses/${_id}`, body, {
			headers: this.headers
		}).pipe(
            take(1)
        );
    }

    deleteExpense(_id: string) {
        return this.http.delete(`${this.BlockedApiUrl}/expenses/${_id}`, {
			headers: this.headers
		}).pipe(
            take(1)
        );
    }

}
