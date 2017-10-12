import { Component ,ViewChild} from '@angular/core';
import {Nav, Platform ,} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {NativeStorage} from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {MainPage} from '../pages/main/main';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen , public natstorage :NativeStorage) {
    this.natstorage.getItem("user").then(data=>{
      this.rootPage=MainPage;
      this.nav.setRoot(this.rootPage);
      },err=>{
        this.nav.setRoot(this.rootPage);
      })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

