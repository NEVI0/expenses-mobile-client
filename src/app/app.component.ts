import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

    private readonly StorageTheme = environment.StorageTheme;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage
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
