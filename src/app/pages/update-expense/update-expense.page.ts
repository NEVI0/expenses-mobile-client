import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { DashService } from '../../dash/dash.service';
import { Expense } from '../../interfaces/Expense';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.page.html',
  styleUrls: ['./update-expense.page.scss'],
})

export class UpdateExpensePage implements OnInit {

    public form: FormGroup;

    private expenseId: string;
    private token: string;

    private name: string;
    private value: number;
    private date: Date;
    private description: string;

    public isLoading: boolean;
    public total: number;

    constructor(
        private formBuilder: FormBuilder,
        private dashService: DashService,
        private activatedRoute: ActivatedRoute,
        private toastCtrl: ToastController,
        private router: Router
    ) {}

    ngOnInit() {
        this.expenseId = this.activatedRoute.snapshot.params['id'];
        this.token = this.activatedRoute.snapshot.params['token'];

        this.name = this.activatedRoute.snapshot.params['name'];
        this.value = this.activatedRoute.snapshot.params['value'];
        this.date = this.activatedRoute.snapshot.params['date'];
        this.description = this.activatedRoute.snapshot.params['description'];

        this.form = this.formBuilder.group({
            name: [ this.name, Validators.required ],
            value: [ this.value, Validators.required ],
            date: [ this.date, [
                Validators.required,
                Validators.pattern("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$")
            ] ],
            description: [ this.description, Validators.maxLength(200) ]
        });

        this.form.valueChanges.subscribe(form => {
            if (form.description !== null) this.total = form.description.length
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.form.disable();

        if (this.form.value.description == '' || this.form.value.description == null) {
            this.form.value.description = 'Sem Descrição';
        }

        this.form.value.tags = [
            this.form.value.name.toUpperCase(),
            this.form.value.value.toString(),
            this.form.value.date.toString()
        ];

        const stringify = JSON.stringify(this.form.value);

        this.dashService.updateExpense(JSON.parse(stringify), this.expenseId, this.token).subscribe(
            async resp => {
                this.isLoading = false;
                this.form.enable();
                const toastRef = await this.toastCtrl.create({
                    message: 'A despesa foi atualizada com sucesso!',
                    duration: 3500
                });
                toastRef.present();
                this.router.navigate(['/', 'expense-detail', this.expenseId, this.token]);
            },
            async err => {
                this.isLoading = false;
                this.form.enable();
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500
                });
                toastRef.present();
            }
        );
    }

    onCancel() {
        this.form.reset();
        this.router.navigate(['/', 'expense-detail', this.expenseId, this.token]);
    }

}
