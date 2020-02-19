import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
})

export class ExpenseDetailPage implements OnInit {

    constructor(private actionSheetCtrl: ActionSheetController) {}

    ngOnInit() {}

    async onShowOptions() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Opções de Ação',
            cssClass: 'my-action-sheet',
            buttons: [
                {
                    text: 'Marcar como Pago',
                    icon: 'checkmark-done',
                    cssClass: 'btn-one',
                    handler: () => {
                        console.log('Checkmark');
                    },
                }, {
                    text: 'Editar Dados',
                    icon: 'brush',
                    cssClass: 'btn-two',
                    handler: () => {
                        console.log('Update');
                    }
                }, {
                    text: 'Excluir Despesa',
                    icon: 'trash-bin',
                    cssClass: 'btn-three',
                    handler: () => {
                        console.log('Delete');
                    }
                }, {
                    text: 'Fechar',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Close');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

}
