import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { environment } from '../../../environments/environment';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})

export class AccountComponent implements OnInit {

    private readonly StorageTheme = environment.StorageTheme;
    public darkMode: boolean;

    constructor(
        private popoverCtrl: PopoverController,
        private storage: Storage
    ) {}

    ngOnInit() {
        if (document.body.classList.contains('light')) {
			this.darkMode = false;
		} else {
			this.darkMode = true;
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

}
