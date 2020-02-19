import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

    isLoginMode: boolean = true;
    form: FormGroup;

    constructor(
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [ null, Validators.required ],
            email: [ null, [ Validators.required, Validators.email ] ],
            password: [ null, Validators.required ],
            confirm_password: [ null, Validators.required ]
        });
    }

    onSubmit() {
        if (this.isLoginMode) {
            console.log("Login...")
            this.router.navigate(['/dash']);
        } else {
            console.log("Cadastrar...")
        }
    }

    onForgotPassword() {
        console.log('Esqueci... ;)');
    }

}
