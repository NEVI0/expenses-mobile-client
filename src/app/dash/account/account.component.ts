import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})

export class AccountComponent implements OnInit {

    constructor(
        private popoverCtrl: PopoverController
    ) {}

    ngOnInit() {}

    async onOpenPopover(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });
        await popover.present();
    }

}
