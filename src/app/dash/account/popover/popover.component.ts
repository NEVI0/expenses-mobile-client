import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(
        private router: Router,
        private popoverCtrl: PopoverController
    ) {}

    ngOnInit() {}

    async onLogout() {
        this.router.navigate(['/auth']);
        await this.popoverCtrl.dismiss();
    }

    onUpdateAccount() {
        console.log("Redireciona para a página de Atualização de conta");
    }

}
