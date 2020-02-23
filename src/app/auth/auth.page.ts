import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

    private readonly AppUserData = environment.StorageUserData;

    public isLoginMode: boolean = true;
    public form: FormGroup;
    public isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toastCtrl: ToastController,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [ null, Validators.required ],
            email: [ null, [ Validators.required, Validators.email ] ],
            password: [ null, Validators.required ],
            conf_password: [ null, Validators.required ]
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.form.disable();

        const stringify = JSON.stringify(this.form.value)

        if (this.isLoginMode) {
            this.authService.login(JSON.parse(stringify)).subscribe(
                resp => {
                    this.isLoading = false;
                    this.storage.set(this.AppUserData, JSON.stringify(resp));
                    this.router.navigate(['/dash']);
                },
                err => {
                    this.isLoading = false;
                    this.form.enable();
                    this.toastCtrl.create({
                        message: err.error.message,
                        duration: 3500
                    }).then(el => {
                        el.present();
                    });
                }
            );
        } else {
            this.authService.signup(JSON.parse(stringify)).subscribe(
                resp => {
                    this.isLoading = false;
                    this.storage.set(this.AppUserData, JSON.stringify(resp));
                    this.router.navigate(['/dash']);
                },
                err => {
                    this.isLoading = false;
                    this.form.enable();
                    this.toastCtrl.create({
                        message: err.error.message,
                        duration: 3500
                    }).then(el => {
                        el.present();
                    });
                }
            );
        }
    }

    onForgotPassword() {
        console.log('Esqueci... ;)');
    }

}
