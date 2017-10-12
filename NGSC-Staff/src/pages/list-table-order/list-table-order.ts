import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import {PosProvider} from '../../providers/pos/pos';
/**
 * Generated class for the ListTableOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-table-order',
  templateUrl: 'list-table-order.html',
})
export class ListTableOrderPage {
  public name = "Tables";
  public userid ;
  public tableCode = 0;
  public orders : Array<any>;
  public ordersReady = false ;
  public NoOrders = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public posProvider : PosProvider , public natStorage :  NativeStorage) {
    this.natStorage.getItem("user").then(data=>{
      this.userid = data.EmployeeID;
    },err=>{
      this.userid= "3";
    })
    this.orders = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListTableOrderPage');
  }

  public searchTable(){
    this.posProvider.get_table_order(this.tableCode).subscribe(data=>{
      if(data.length > 0){
        this.orders = new Array();
        for(let i =0 ; i<data.length ; i++){
          this.orders.push({desc : data[i].OrderDetails ,id : data[i].OrderID, status : data[i].OrderFinished ,Ename : data[i].EmployeeName , qty : data[i].QTY , name : data[i].ProductName ,});
        }
        console.log(this.orders);
        this.ordersReady= true;
        this.NoOrders = false;
      }else{
        this.ordersReady= false;
        this.NoOrders = true;
      }
    },err=>{
      this.ordersReady= false;
      this.NoOrders = true;
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
}
