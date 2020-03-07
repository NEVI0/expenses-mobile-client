import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { environment } from '../../../environments/environment';
import { PopoverComponent } from './popover/popover.component';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})

export class AccountComponent implements OnInit {

    private readonly AppUserData = environment.StorageUserData;
    private readonly StorageTheme = environment.StorageTheme;

    private userId: string;
    private token: string;

    public userName: string;
    public userEmail: string;

    public darkMode: boolean;
    public didSendEmail: boolean;

    constructor(
        private popoverCtrl: PopoverController,
        private storage: Storage,
        private dashService: DashService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private router: Router
    ) {}

    ngOnInit() {
        this.onStart();
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
        if (document.body.classList.contains('light')) {
            this.darkMode = false;
        } else {
            this.darkMode = true;
        }

        this.storage.get(this.AppUserData).then(value => {
            const user = JSON.parse(value);
            this.userName = user.name;
            this.userEmail = user.email;
            this.userId = user._id;
            this.token = user.token;
        });
    }

    onChangeTheme() {
        if (document.body.classList.contains('light')) {
            this.darkMode = true;

            document.body.classList.remove('light');
            document.body.classList.add('dark');

            this.storage.set(this.StorageTheme, 'dark');
        } else {
            this.darkMode = false;

            document.body.classList.remove('dark');
            document.body.classList.add('light');

            this.storage.set(this.StorageTheme, 'light');
        }
    }

    async onOpenPopover(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });
        await popover.present();
    }

    async onShowAlertAccount() {
        const alert = await this.alertCtrl.create({
            header: 'Alerta!',
            message: 'Você tem certeza que quer deletar sua conta? Se sim, você <b>não poderá mais recuperar</b> seus dados',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim, quero deleta-lá',
                    handler: () => this.onDeleteAccount()
                }
            ]
        });
        alert.present();
    }

    private onDeleteAccount() {
        this.dashService.deleteUser(this.userId, this.token).subscribe(
            async resp => {
                const toast = await this.toastCtrl.create({
                    message: 'Estamos deletando seus dados...'
                });
                toast.present();
                this.storage.clear().then(value => {
                    toast.dismiss();
                    this.router.navigate(['/auth'])
                });
            },
            async err => {
                const toast = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toast.present();
            }
        );
    }

    onSendEmail() {
        const stringify = '{ "email": "'+this.userEmail+'" }';

        this.didSendEmail = true;
        this.dashService.forgotPassword(JSON.parse(stringify)).subscribe(
            async resp => {
                this.didSendEmail = false;
                const toastRef = await this.toastCtrl.create({
                    message: 'Um e-mail foi enviado para você!',
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
            },
            async err => {
                this.didSendEmail = false;
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
            }
        );
    }

}
