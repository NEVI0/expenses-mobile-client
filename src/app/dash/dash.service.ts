import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Expense } from '../interfaces/Expense';
import { DataController } from '../interfaces/DataController';

@Injectable({
  providedIn: 'root'
})

export class DashService {

    private readonly OpenedApiUrl = environment.OpenedApiUrl;
    private readonly BlockedApiUrl = environment.BlockedApiUrl;
    private readonly AppUserData = environment.StorageUserData;

    constructor(private http: HttpClient) {}

    getAllExpenses(_id: string, token: string) {
        return this.http.get<Expense[]>(`${this.BlockedApiUrl}/expenses/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
			tap(resp => resp)
		);
    }

    getLastTenExpenses(_id: string, token: string) {
        return this.http.get<Expense[]>(`${this.BlockedApiUrl}/lastExpenses/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
			tap(resp => resp)
		);
    }

    getOnlyOneExpense(_id: string, token: string) {
        return this.http.get<Expense>(`${this.BlockedApiUrl}/expense/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }

    getUserDataCtrl(_id: string, token: string) {
        return this.http.get<DataController>(`${this.BlockedApiUrl}/dataController/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
			tap(resp => resp)
		);
    }

    createExpense(body: JSON, token: string) {
        return this.http.post(`${this.BlockedApiUrl}/expenses/`, body, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }

    updateExpense(body: JSON, _id: string, token: string) {
        return this.http.put<Expense>(`${this.BlockedApiUrl}/expenses/${_id}`, body, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }

    deleteExpense(_id: string, token: string) {
        return this.http.delete(`${this.BlockedApiUrl}/expenses/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }





    deleteUser(_id: string, token: string) {
        return this.http.delete(`${this.BlockedApiUrl}/user/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }

}
