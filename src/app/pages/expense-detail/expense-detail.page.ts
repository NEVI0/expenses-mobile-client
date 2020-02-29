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
                    text: 'Editar Dados',
                    icon: 'brush',
                    cssClass: 'btn-two',
                    handler: () => {
                        this.onUpdateExpense();
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
                    duration: 3500
                });
                toastRef.present();
                this.onStart();
            },
            async err => {
                console.log(err);
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500
                });
                toastRef.present();
            }
        );
    }

    private onUpdateExpense() {}

    private onDeleteExpense() {
        this.dashService.deleteExpense(this.expense._id, this.token).subscribe(
            async resp => {
                const toastRef = await this.toastCtrl.create({
                    message: 'Sua despesa foi deletada com sucesso!',
                    duration: 3500
                });
                toastRef.present();
                this.router.navigate(['/dash/home-page']);
            },
            async err => {
                console.log(err);
                const toastRef = await this.toastCtrl.create({
                    message: err.error.message,
                    duration: 3500
                });
                toastRef.present();
            }
        );
    }

}
