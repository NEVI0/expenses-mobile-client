import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
        private screenOrientation: ScreenOrientation,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.splashScreen.show();
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.screenOrientation.lock('portrait');
        });
    }

    ngOnInit() {
        this.onStart();
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
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

        this.storage.get(this.AppUserData).then(value => {
            if (value == '' || value == undefined || value == null) {
                this.router.navigate(['/auth']);
            } else {
                this.authService.validateToken(JSON.parse(value)).subscribe(
                    async (resp: any) => {

                        if (resp.valid !== true) {
                            if (window.location.href !== `${this.ApplicationUrl}/auth`) {

                                const alertRef = await this.alertCtrl.create({
                                    header: 'Alerta!',
                                    message: 'Ops! Você <b>não pode</b> acessar o sistema se a sua <b>sessão estiver expirada</b>. Por favor, faça o login.',
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
            }
        });
    }

}
