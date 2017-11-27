import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {OrderPage} from '../order/order';

import {PosProvider} from '../../providers/pos/pos';
import {Resturant , Product , Category} from '../../templates/pos';
/**
 * 
 * 
 * Generated class for the restaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {
  public searchterm ="";
  public name : string ="restaurants";
  private orders : Array<{
    item: Product;
    quantity: number;
    comments : any;
    mainIndex : number;
    
  }>;
  private subOrders : Array <{
    item: Product;
    quantity : number;
    comments : any;
    mainIndex : number;
  }>;
  public haveMenu :boolean =false;
  private resturants : Resturant[] ;

  private categories : Category[] ;


  private products : Product[] ;

    private choosenrestaurant :any;

    public choosenProducts :Array<any>;

    public tempCat : Category;

    public user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:PosProvider,public natStorage : NativeStorage) {
    if(this.navParams.get("user") !=undefined){
      this.user =this.navParams.get("user");
    }
    
    this.tempCat = new Category();
    this.choosenrestaurant =this.navParams.get("restaurant");
    this.resturants = this.navParams.get("restaurants");
    this.name=this.choosenrestaurant.name;
    this.categories = new Array();
    this.categories[0] = new Category("All","-2");
    if(this.choosenrestaurant != undefined){
      if(this.choosenrestaurant.products.length >0){
    for(var i =0;i< this.choosenrestaurant.products.length;i++)
      {
        
        let newCategory = true;
        for(var j = 0 ;j<this.categories.length;j++){
          if(this.categories[j].id == this.choosenrestaurant.products[i].category.id){
            console.log( this.choosenrestaurant.products[i].category.id);
            newCategory = false;
          }
        }
        if(newCategory ==true){
          this.categories[this.categories.length]=this.choosenrestaurant.products[i].category;
      }
  }
 
}

console.log(this.categories);
this.reset();
this.haveMenu = true;
}
  }
  setRestaurant(restaurant : any = this.choosenrestaurant){
    this.choosenrestaurant = restaurant;
    this.orders= new Array();
    this.subOrders = new Array();
    this.orders.length =this.choosenrestaurant.products.length;
    for(var i =0;i<this.orders.length;i++){
      this.orders[i] ={item :this.choosenrestaurant.products[i],quantity:0 ,mainIndex : i,comments : ""}
     //console.log(this.orders[i]);
     
    }
    }
    changeNumber(func : String,index : any){
      // console.log(this.orders.length);
       
       //this.subOrders[index].item=this.choosenrestaurant.products[index]; //order is important  first change the item from defult
   
       if(func == 'add' && this.subOrders[index].quantity < this.subOrders[index].item.quantity){
         this.subOrders[index].quantity++; // then change its quantity
       }else if(func == 'remove'){
         if(this.subOrders[index].quantity!=0){
             
             this.subOrders[index].quantity--;
         }
           
         
       }
       //console.log(this.orders);
     }
     order(){
      let totalPrice =0;
      if(this.subOrders.length>0){
        for(var i = 0;i<this.subOrders.length;i++){
          this.orders[this.subOrders[i].mainIndex].quantity=this.subOrders[i].quantity;
        }
      }
      for(let i =0; i< this.orders.length;i++){
        totalPrice += (this.orders[i].item.price*this.orders[i].quantity);
      }
      console.log(totalPrice);
      console.log(this.orders);
      console.log(this.tempCat);
      this.navCtrl.push(OrderPage,{"orders":this.orders ,"user" :this.user, "restaurant": this.choosenrestaurant ,"allRestaurants" :this.resturants , "Parent" : this});
    }

    public filter(category : Category = this.categories[0] ){
      this.choosenProducts = new Array();
      console.log(category);
      let counter =0;
      this.saveOrders();
      if(category.id =='-2'){
        this.choosenProducts = this.choosenrestaurant.products;
        this.subOrders = this.orders;
      }else{
        for(let i =0;i<this.choosenrestaurant.products.length;i++){
          if(this.choosenrestaurant.products[i].category.id == category.id )
            {
              this.choosenProducts[counter]=this.choosenrestaurant.products[i];
              this.subOrders[counter] =this.orders[i];
              counter++;
            }
        }
        console.log(this.subOrders);
      }
    }
    
    public search(){
      this.saveOrders();
      this.choosenProducts= this.ProdProvider.filter(this.choosenrestaurant.products,this.searchterm);
     }

     saveOrders(){
      if(this.subOrders.length>0){
        for(let i = 0;i<this.subOrders.length;i++){
          this.orders[this.subOrders[i].mainIndex].quantity=this.subOrders[i].quantity;
        }
      }
      this.subOrders=new Array();

     }
  public reset(){
    this.setRestaurant();
    this.filter();
  }

}
