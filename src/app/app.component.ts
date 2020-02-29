import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

    private readonly StorageTheme = environment.StorageTheme;
    private readonly AppUserData = environment.StorageUserData;
    private readonly ApplicationUrl = environment.ApplicationUrl;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        private router: Router,
        private authService: AuthService,
        private alertCtrl: AlertController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.onStart();
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
        this.storage.get(this.AppUserData).then(value => {
            this.authService.validateToken(JSON.parse(value)).subscribe(
                async (resp: any) => {

                    if (resp.valid !== true) {
                        if (window.location.href !== `${this.ApplicationUrl}/auth`) {

                            const alertRef = await this.alertCtrl.create({
                                header: 'Alerta!',
                                message: 'Ops! Você <b>precisa fazer o login</b> para poder usar o app',
                                buttons: [{
                                    text: 'Fazer Login',
                                    handler: () => {
                                        this.router.navigate(['/auth']);
                                    }
                                }]
                            });
                            alertRef.present();
                            alertRef.onWillDismiss().then(() => {
                                this.router.navigate(['/auth']);
                            });

                        }
                    }

                }
            );
        });
        this.storage.get(this.StorageTheme).then(value => {
            if (value == 'light') {
                document.body.classList.remove('dark');
                document.body.classList.add(value);
            }
            if (value == 'dark') {
                document.body.classList.remove('light');
                document.body.classList.add(value);
            }
            if (value !== 'light' && value !== 'dark') {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        });
    }

}
