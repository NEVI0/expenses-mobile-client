import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Expense } from '../interfaces/Expense';
import { DataController } from '../interfaces/DataController';
import { User } from '../interfaces/User';
import { ChartDataController } from '../interfaces/ChartDataController';

@Injectable({
  providedIn: 'root'
})

export class DashService {

    private readonly OpenedApiUrl = environment.OpenedApiUrl;
    private readonly BlockedApiUrl = environment.BlockedApiUrl;

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

    getChartData(_id: string, token: string) {
		return this.http.get<ChartDataController[]>(`${this.BlockedApiUrl}/chartController/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
			tap(resp => resp)
		);
	}

    search(_id: string, tag: string, token: string) {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/search/${_id}?tag=${tag}`, {
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

    forgotPassword(body: JSON) {
        return this.http.post<string>(`${this.OpenedApiUrl}/forgotPass`, body).pipe(
            take(1)
        );
    }

    updateUser(body: JSON, _id: string, token: string) {
		return this.http.put<User>(`${this.BlockedApiUrl}/user/${_id}`, body, {
			headers: new HttpHeaders({
                'Authorization': token
            })
        }).pipe(
            take(1)
        );
	}

    deleteUser(_id: string, token: string) {
        return this.http.delete<string>(`${this.BlockedApiUrl}/user/${_id}`, {
			headers: new HttpHeaders({
                'Authorization': token
            })
		}).pipe(
            take(1)
        );
    }

}
