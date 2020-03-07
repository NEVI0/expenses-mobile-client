import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ActionSheetController, ToastController, AlertController } from '@ionic/angular';

import { DashService } from '../../dash/dash.service';
import { Expense } from '../../interfaces/Expense';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
})

export class ExpenseDetailPage implements OnInit {

    public expense$: Observable<Expense>;
    private expense: Expense;

    private expenseId: string;
    private token: string;
    public lastPage: string;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private activatedRoute: ActivatedRoute,
        private dashService: DashService,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private router: Router
    ) {}

    ngOnInit() {
        this.expenseId = this.activatedRoute.snapshot.params['id'];
        this.token = this.activatedRoute.snapshot.params['token'];

        this.activatedRoute.queryParams.subscribe(query => {
            if (query.page == 'all-expenses') {
                this.lastPage = `all-expenses`;
            } else {
                this.lastPage = `home-page`;
            }
        });
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
        this.expense$ = this.dashService.getOnlyOneExpense(this.expenseId, this.token).pipe(
            tap(resp => this.expense = resp)
        );
    }

    async onShowOptions() {

        let changeStatus: string = null;

        if (this.expense.status == 'PAGO') {
            changeStatus = 'Pendente'
        } else {
            changeStatus = 'Pago'
        }

        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Opções de Ação',
            cssClass: 'my-action-sheet',
            buttons: [
                {
                    text: `Marcar como ${changeStatus}`,
                    icon: 'checkmark-done',
                    cssClass: 'btn-one',
                    handler: () => {
                        this.onUpdateStatus();
                    },
                }, {
                    text: 'Duplicar Despesa',
                    icon: 'copy',
                    cssClass: 'btn-four',
                    handler: () => {
                        this.onDuplicateExpense();
                    }
                }, {
                    text: 'Editar Dados',
                    icon: 'brush',
                    cssClass: 'btn-two',
                    handler: () => {
                        this.router.navigate([
                            '/',
                            'update-expense',
                            this.expense._id,
                            this.token,
                            this.expense.name,
                            this.expense.value,
                            this.expense.date,
                            this.expense.description,
                        ]);
                    }
                }, {
                    text: 'Excluir Despesa',
                    icon: 'trash-bin',
                    cssClass: 'btn-three',
                    handler: () => {
                        this.onShowAlertToDelete();
                    }
                }, {
                    text: 'Fechar',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    private async onShowAlertToDelete() {
        const alertRef = await this.alertCtrl.create({
            header: 'Alerta!',
            message: 'Você quer mesmo deletar essa despesa?',
            buttons: [{
                text: 'Não',
                role: 'cancel'
            }, {
                text: 'Sim',
                handler: () => {
                    this.onDeleteExpense()
                },
            }]
        });
        alertRef.present();
    }

    private onUpdateStatus() {

        let stringify: string = null;

        if (this.expense.status == 'PAGO') {
            stringify = '{ "status": "PENDENTE" }';
        } else {
            stringify = '{ "status": "PAGO" }';
        }

        this.dashService.updateExpense(JSON.parse(stringify), this.expense._id, this.token).subscribe(
            async resp => {
                const toastRef = await this.toastCtrl.create({
                    message: 'O status da despesa foi mudado!',
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
                this.onStart();
            },
            async err => {
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
            }
        );
    }

    private onDuplicateExpense() {
        const date = {
            d: new Date().getDate(),
            m: new Date().getMonth(),
            y: new Date().getFullYear()
        }

        var d = null;
        var m = null;

        if (date.d >= 1 && date.d <= 9) d = "0" + date.d; else d = date.d;
        if (date.m >= 1 && date.m <= 9) m = "0" + (date.m + 1); else m = date.m;

        const json = {
            name: this.expense.name,
            value: this.expense.value,
            date: `${d}/${m}/${date.y}`,
            description: this.expense.description,
            userId: this.expense.userId
        };

        const stringify = JSON.stringify(json);

        this.dashService.createExpense(JSON.parse(stringify), this.token).subscribe(
            async resp => {
                const toastRef = await this.toastCtrl.create({
                    message: 'A despesa foi duplicada!',
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
                this.router.navigate(['/', 'dash', this.lastPage]);
            },
            async err => {
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
            }
        );
    }

    private onDeleteExpense() {
        this.dashService.deleteExpense(this.expense._id, this.token).subscribe(
            async resp => {
                const toastRef = await this.toastCtrl.create({
                    message: 'Sua despesa foi deletada com sucesso!',
                    duration: 3500,
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                toastRef.present();
                this.router.navigate(['/dash/home-page']);
            },
            async err => {
                console.log(err);
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
