import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [ null, Validators.required ],
            email: [ null, [Validators.required, Validators.email] ],
            password: [ null, Validators.required ],
            confirm_password: [ null, Validators.required ]
        });
    }

    onSubmit() {
        if (this.isLoginMode) {
            console.log("Login...")

            this.toastCtrl.create({
                message: 'Error Message!',
                duration: 3500,
                buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                }]
            }).then(el => {
                el.present();
            });

        } else {
            console.log("Cadastrar...")
        }
    }

    onForgotPassword() {
        console.log('Esqueci... ;)');
    }

}
