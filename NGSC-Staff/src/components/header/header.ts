import { Component,Input } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {App,NavController} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';

import {LoginPage} from '../../pages/login/login';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ngsc-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
@Input()
  name: string="header";
  //logedIn :boolean = true;
  defaultPage : string = "defaultPage";
  constructor(public nativeStorage :NativeStorage,public navCtrl :NavController,public app:App) {
  // this.init();
    
  }
  
  public logOut(){
    this.nativeStorage.remove("user")
    this.app.getRootNav().setRoot(LoginPage);
    
  }
  ionViewDidLoad() {
  }

}
