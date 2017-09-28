import { Component } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';

import { NavController, NavParams } from 'ionic-angular';
import { PosProvider} from '../../providers/pos/pos';
import { UserProvider} from '../../providers/user/user';
import {Category,Product,Resturant } from "../../templates/pos";

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public name = "Orders";
  private orders : Array<{
    item: Product;
    quantity: number; 
    comments : any;
  }>;
  public viewOrder :Array<any>;

  public orderPrice:number = 0;
  public tableCode : number = 0;
  public user : any;
  public paymentMethod :number = 61 ;
  public restaurant : any;
  public allRestaurnats : any;
  public ready : boolean = false;
  public dToRestaurnat :any;
  public service : number;
  public charge : number;
  public totalprice :number;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
      public natStorage : NativeStorage ,
      public ProdProvider :PosProvider,
      public userPorvider :UserProvider
    ) {
    this.viewOrder = new Array();
    this.orders = this.navParams.get("orders");
    this.restaurant = this.navParams.get("restaurant");
    this.user = this.navParams.get("user");
    this.dToRestaurnat = this.restaurant;
    this.allRestaurnats = this.navParams.get("allRestaurants");
      console.log(this.allRestaurnats);
    let counter= 0;
    for(let i =0; i< this.orders.length;i++){
      this.orderPrice += (this.orders[i].item.price*this.orders[i].quantity);
      if(this.orders[i].quantity >0){
        this.viewOrder[counter] = this.orders[i];
        counter++;
      }
    }
    this.charge = Math.ceil((this.orderPrice*14)/100);
    this.service = Math.ceil((this.orderPrice*12)/100);
    this.totalprice = this.orderPrice+this.charge+this.service;
    this.ready=true;
    
  }

  public changePayment(payment : string ){
    if(payment == "cash"){
      this.paymentMethod = 41;
    }else if(payment == "balance"){
      this.paymentMethod = 61;
    }

  }
  
  public confirmOrder(){
    if(this.tableCode >0 && this.tableCode <= 100){
    let count = 0;
    
    for(var i =0 ; i<this.orders.length;i++){
      count += this.orders[i].quantity;
    }
    console.log(count);
    let today  = new Date();
    let time = today.getHours()+":"+today.getMinutes();
    this.ProdProvider.add_invoice_header(count,this.totalprice,0,this.user.EmployeeID,this.paymentMethod,0,this.restaurant.id,"Pending",this.dToRestaurnat.id,this.tableCode,0).subscribe(data=>{

    let invId=data;
    let ordernumber =0;
    for(var i = 0;i<this.orders.length;i++){
      if(this.orders[i].quantity > 0){
        this.ProdProvider.add_invoice_item(this.orders[i].item.category.id,this.orders[i].item.id,this.orders[i].quantity,this.orders[i].item.price,0,this.user.EmployeeID,this.paymentMethod,invId,"Pending",this.dToRestaurnat.id,this.tableCode,this.orders[i].comments).subscribe(Data=>{
          ordernumber++;
          if(ordernumber == this.viewOrder.length ){
            alert ("Order Completed");
            this.navCtrl.pop();
          }
    },Err=>{
      alert(Err);
    })
      }
      
      
    }
    
  },err=>{
    console.log(err);
  })
  
  }else{
    alert("enter valid table number");
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
