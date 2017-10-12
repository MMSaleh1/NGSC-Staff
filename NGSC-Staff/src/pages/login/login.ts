import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage } from '@ionic-native/native-storage';
import { UserProvider} from '../../providers/user/user';

import {MainPage} from '../main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public logedinBefore : boolean =false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
      public userProvider :UserProvider,
      public natStorage : NativeStorage,
      private formBuilder:FormBuilder ) {
        this.buildForm();


  }
  buildForm(): void {
		this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password : ['',[Validators.required]]
      
  });
  }

  onlogin(){

    this.logedinBefore=true;

    if(this.loginForm.valid){
      this.userProvider.logIn(this.loginForm.value.username,this.loginForm.value.password).subscribe(data=>{
        if(data.length > 0){
        console.log(data[0]);
        this.natStorage.setItem("user" ,data[0]);
        this.navCtrl.setRoot(MainPage,{"user" : data[0]});
        }else{
          alert("Enter valed username & password");
        }
      },err=>{
        alert(err);
      }
      )
    }else{
      console.log("notvaled");
    }

  }

}
