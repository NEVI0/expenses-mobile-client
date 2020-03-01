import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { environment } from '../../../../environments/environment';
import { UpdateAccountComponent } from '../update-account/update-account.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    private readonly AppUserData = environment.StorageUserData;

    constructor(
        private router: Router,
        private popoverCtrl: PopoverController,
        private storage: Storage,
        private modalCtrl: ModalController
    ) {}

    ngOnInit() {}

    onLogout() {
        this.storage.clear().then(async value => {
            this.router.navigate(['/auth']);
            await this.popoverCtrl.dismiss();
        });
    }

    onShowModal() {
        this.storage.get(this.AppUserData).then(async value => {
            const user = JSON.parse(value);

            const modalRef = await this.modalCtrl.create({
                component: UpdateAccountComponent,
                animated: true,
                componentProps: {
                    user: user
                }
            });
            this.popoverCtrl.dismiss();
            modalRef.present();
        });
    }

    onUpdateAccount() {
        console.log("Redireciona para a página de Atualização de conta");
    }

}
