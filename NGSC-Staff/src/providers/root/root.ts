import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

/*
  Generated class for the RootProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RootProvider {
  public CONFIG={
    "API": "http://services.edge-techno.com/NGSCMobilApi/api/APP/",
    "RELESE":false
  };
  constructor(public http: Http ,public natStorage : NativeStorage) {
    console.log('Hello RootProvider Provider');
  }
  //cashe functions

  protected get_http(url:string): Observable<any>{
    let subject = new Subject();
    this.get_Storage(url,data=>{
      subject.next(data);
    },err=>{
      this.get_url(url,data=>{
        subject.next(data);
      },err=>{
        subject.next(err);
      })
    })

    return subject.asObservable();
  }

 private get_Storage(url : string,succ : Function , fail : Function){
    this.natStorage.getItem(url).then(data=>{
      if(data != null){
        succ(data);
      }else{
        fail();
      }
    },err=>{
      fail(err);
    })
  }


 private get_url(url : string , succ: Function , fail :Function){
    this.http.get(url).subscribe(data=>{
    this.natStorage.setItem(url,data);
    succ(data)
    },err=>{
      fail(err);
    })
  }

}
