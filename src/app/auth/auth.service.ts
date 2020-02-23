import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly OpenedApiUrl = environment.OpenedApiUrl;
    private readonly AppUserData = environment.StorageUserData;

    private _user: User;

    constructor(
        private http: HttpClient,
        private storage: Storage
    ) {}

    get user() {
        this.getAppUserData();
        return this._user;
    }

    login(body: JSON) {
        return this.http.post<User>(`${this.OpenedApiUrl}/login`, body).pipe(
            tap(user => this._user = user),
            take(1)
        );
    }

    signup(body: JSON) {
        return this.http.post<User>(`${this.OpenedApiUrl}/signup`, body).pipe(
            tap(user => this._user = user),
            take(1)
        );
    }

    validateToken(body: JSON) {
        return this.http.post<boolean>(`${this.OpenedApiUrl}/validateToken`, body).pipe(
            take(1)
        );
    }

    forgotPassword(body: JSON) {
        return this.http.post<string>(`${this.OpenedApiUrl}/forgotPass`, body).pipe(
            take(1)
        );
    }

    private getAppUserData() {
        this.storage.get(this.AppUserData).then((value: any) => {
            this._user = JSON.parse(value);
        });
    }

}
