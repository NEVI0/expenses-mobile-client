import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { User } from '../../../interfaces/User';
import { DashService } from '../../dash.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss'],
})

export class UpdateAccountComponent implements OnInit {

    @Input() user: User;

    private readonly AppUserData = environment.StorageUserData;

    public form: FormGroup;
    public isLoading: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private dashService: DashService,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [ this.user.name, Validators.required ],
            salary: [ this.user.salary, Validators.required ],
            email: [ this.user.email, [ Validators.required, Validators.email ] ]
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.form.disable();

        const stringify = JSON.stringify(this.form.value);

        this.dashService.updateUser(JSON.parse(stringify), this.user._id, this.user.token).subscribe(
            resp => {
                this.storage.clear();
                this.storage.set(this.AppUserData, JSON.stringify(resp)).then(async value => {

                    const toastRef = await this.toastCtrl.create({
                        message: 'Seus dados foram atualizados com sucesso!',
                        duration: 3500
                    });
                    this.form.enable();
                    this.modalCtrl.dismiss();
                    toastRef.present();

                }).catch(async err => {

                    const toastRef = await this.toastCtrl.create({
                        message: 'Ocorreu um error, tente mais tarde!',
                        duration: 3500
                    });
                    this.form.enable();
                    this.modalCtrl.dismiss();
                    toastRef.present();

                });
            },
            async err => {
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500
                });
                this.form.enable();
                this.modalCtrl.dismiss();
                toastRef.present();
            }
        );

    }

    onCancelUpdate() {
        this.modalCtrl.dismiss();
    }

}
