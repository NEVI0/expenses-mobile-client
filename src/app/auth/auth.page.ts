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

    async onSubmit() {
        this.isLoading = true;
        this.form.disable();

        const stringify = JSON.stringify(this.form.value);

        const toastRef = await this.toastCtrl.create({
            message: 'Validando dados...'
        });
        toastRef.present();

        if (this.isLoginMode) {
            this.authService.login(JSON.parse(stringify)).subscribe(
                resp => {
                    toastRef.dismiss();
                    this.isLoading = false;
                    this.form.enable();
                    this.storage.set(this.AppUserData, JSON.stringify(resp));
                    this.router.navigate(['/dash']);
                },
                err => {
                    toastRef.dismiss();
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
                    toastRef.dismiss();
                    this.isLoading = false;
                    this.form.enable();
                    this.storage.set(this.AppUserData, JSON.stringify(resp));
                    this.router.navigate(['/dash']);
                },
                err => {
                    toastRef.dismiss();
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

    async onForgotPassword() {

        if (this.form.get('email').value == '') {
            const toast = await this.toastCtrl.create({
                message: 'Você precisa indicar um e-mail no formulário',
                duration: 3500
            });
            toast.present();
        } else {

            const stringify = JSON.stringify(this.form.value)

            this.authService.forgotPassword(JSON.parse(stringify)).subscribe(
                async resp => {
                    const toast = await this.toastCtrl.create({
                        message: 'Um e-mail foi enviado para o e-mail indicado',
                        duration: 3500
                    });
                    toast.present();
                },
                async err => {
                    const toast = await this.toastCtrl.create({
                        message: err.error.message,
                        duration: 3500
                    });
                    toast.present();
                }
            );

        }


    }

}
