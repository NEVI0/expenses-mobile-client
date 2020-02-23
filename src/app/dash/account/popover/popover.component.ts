import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { environment } from '../../../../environments/environment';

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
        private storage: Storage
    ) {}

    ngOnInit() {}

    onLogout() {
        this.storage.remove(this.AppUserData).then(async value => {
            this.router.navigate(['/auth']);
            await this.popoverCtrl.dismiss();
        });
    }

    onUpdateAccount() {
        console.log("Redireciona para a página de Atualização de conta");
    }

}
