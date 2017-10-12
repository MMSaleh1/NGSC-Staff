import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {NativeStorage} from '@ionic-native/native-storage';


import {PosProvider} from '../../providers/pos/pos';
/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
  public userid : any;
  public name : string = "My Orders";
  public orders : Array<any>;
  public Ready : boolean = false;
  public NoOrdersFlag : boolean = false;
  public NoOrderMssg : string = " NO Finished Orders";
  constructor(public navCtrl: NavController, public navParams: NavParams , public natStorage :NativeStorage , public posProvider : PosProvider) {
  this.natStorage.getItem("user").then(data=>{
    this.userid = data.EmployeeID;
    this.getOrders();
  },err=>{
    //for browser testing
    this.userid = "3";
    this.getOrders();
  })
  }

  getOrders(){
    this.Ready = false;
    this.posProvider.check_delevery(this.userid).subscribe(data=>{
      
      if(data.length > 0){
        this.orders = new Array();
        for(let i =0 ; i<data.length ; i++){
          this.orders.push({desc : data[i].OrderDetails , tableNo : data[i].TableNo ,id : data[i].OrderID, status : data[i].OrderFinished ,Ename : data[i].EmployeeName , qty : data[i].QTY , name : data[i].ProductName ,});
        }
        console.log(data);
        this.Ready = true;
        
      }else{
        this.Ready = false ;
        this.NoOrdersFlag = true;
      }
    },err=>{
      this.Ready = false ;
      alert("Connection error");
    })
  }

  public updateOrder(order : any){
    console.log(order);
    this.posProvider.update_order(order.id,order.desc).subscribe(data=>{
      console.log(data);
    if(data == 1) {
      alert("Update Complete");
    }else{
      alert("Error Please Try Again");
    }
  },err=>{
    alert("Connection Error");
  })
  }

  public deliverOrder(order : any){
    this.posProvider.deliver_order(order.id).subscribe(data=>{
      if(data == 1){
        console.log(data);
        this.getOrders();
      }else{
        alert("Error");
      }
    },err=>{
      alert(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
  }

}
