import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {
  private loginUrl :string ="CashierLogin";
  constructor(public http: Http , public natStorage : NativeStorage) {
    super(http,natStorage);
  }
  public logIn(userName : string ,password : string) :Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.loginUrl}?EmployeeUname=${userName}&EmployeePassword=${password}`).map(res=><any>res.json());
  }

}
