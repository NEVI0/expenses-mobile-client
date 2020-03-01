import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { DashService } from '../../dash/dash.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})

export class AddExpensePage implements OnInit {

    private readonly AppUserData = environment.StorageUserData;
    private userId: string;
    private userToken: string;

    public form: FormGroup;
    public total: number = 0;
    public isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private dashService: DashService,
        private storage: Storage,
        private toastCtrl: ToastController,
        private router: Router
    ) {}

    ngOnInit() {
        const date = {
            d: new Date().getDate(),
            m: new Date().getMonth(),
            y: new Date().getFullYear()
        }

        var d = null;
        var m = null;

        if (date.d >= 1 && date.d <= 9) d = "0" + date.d; else d = date.d;
        if (date.m >= 1 && date.m <= 9) m = "0" + (date.m + 1); else m = date.m;

        this.form = this.formBuilder.group({
            name: [ null, Validators.required ],
            value: [ null, Validators.required ],
            date: [ `${d}/${m}/${date.y}`, [
                Validators.required,
                Validators.pattern("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$")
            ] ],
            description: [ null, Validators.maxLength(200) ]
        });

        this.form.valueChanges.subscribe(form => {
            if (form.description !== null) this.total = form.description.length
        });
    }

    ionViewWillEnter() {
        this.storage.get(this.AppUserData).then(value => {
            const user = JSON.parse(value);
            this.userId = user._id;
            this.userToken = user.token;
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.form.value.userId = this.userId;

        if (this.form.value.description == "" || this.form.value.description == null) {
            this.form.value.description = "Sem Descrição";
        }

        this.form.value.tags = [
            this.form.value.name.toUpperCase(),
            this.form.value.value.toString(),
            this.form.value.date.toString()
        ];

        const stringify = JSON.stringify(this.form.value);

        this.form.disable();

        this.dashService.createExpense(JSON.parse(stringify), this.userToken).subscribe(
            async resp => {
                this.isLoading = false;
                this.form.enable();
                const toast = await this.toastCtrl.create({
                    message: 'Despesa adicionada com sucesso!',
                    duration: 3500
                });
                toast.present();
                this.router.navigate(['/dash/home-page']);
            },
            async err => {
                this.isLoading = false;
                this.form.enable();
                const toast = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500
                });
                toast.present();
            }
        );

    }

    onCancel() {
        this.router.navigate(['/dash/home-page']);
    }

}
