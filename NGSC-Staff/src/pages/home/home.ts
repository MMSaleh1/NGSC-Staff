import { Component } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
import { NativeStorage} from '@ionic-native/native-storage';
import { PosProvider} from '../../providers/pos/pos';
import {UserProvider} from '../../providers/user/user';
import {RestaurantPage} from '../restaurant/restaurant';

import { Resturant,Category,Product } from '../../templates/pos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Ready : boolean =false;
  public Pos : Array<Resturant>;
  public user  : any;
  public name = "Home";

  constructor(public navCtrl: NavController,
     public posProvider : PosProvider ,
      public natStorage : NativeStorage,
      public userProvider : UserProvider,
      public navParams : NavParams
    
    ) {
    this.Pos= new Array();
    this.natStorage.getItem("POS").then(data=>{
      this.Pos = data;
      this.Ready=true;
    },err=>{
      this.posProvider.get_Pos().subscribe(pos=>{
        if(pos.length >0){
          this.posProvider.get_products().subscribe(prod=>{
            if(prod.length >0){
              let ProductArr = new Array();
              this.posProvider.get_category().subscribe(cat=>{
                if(cat.length > 0){
                  let categories = new Array();
                  for(let i =0 ; i<cat.length;i++){
                    categories[i]= new Category(cat[i].category_name,cat[i].category_id);
                  }
                  
                  for(let j = 0 ; j<prod.length ; j++){
                    let flag = false;
                    for(let i =0 ; i<categories.length;i++){
                      if(categories[i].id==prod[j].prod_category){
                        ProductArr[j] = new Product(prod[j].prod_name,prod[j].prod_image,prod[j].price,prod[j].prod_desc,prod[j].prod_id,prod[j].quantity,categories[i],prod[j].point_id); // add product to the product array
                       flag = true;
                        break;
                      }
                    }
                    if(flag == false){
                      ProductArr[j] = new Product(prod[j].prod_name,prod[j].prod_image,prod[j].price,prod[j].prod_desc,prod[j].prod_id,prod[j].quantity,new Category(),prod[j].point_id); // add product to the product array
                    }
          
                    
                  
                  }
  
                  for(let i =0;i<pos.length;i++){ // itirate over the POS
            this.Pos[i] = new Resturant(pos[i].PointName,pos[i].PointID,pos[i].PointDesc,pos[i].PointLogo,[new Product()],pos[i].PointCategory);//add a POS to the array
            let counter = 0; // counter that points to  first empty postion in the products array for each POS
            for(let j=0 ; j<prod.length ; j++){ // itirate over the products
              if(ProductArr[j].PosId == this.Pos[i].id ){ // check if the current product has he point of sale id as the current POS 
                this.Pos[i].products[counter] = ProductArr[j];// if true => add the product to the array of products in the current POS
                counter++; // move the counter to point to the next postion in the array
                
              }
            } 
          }
          console.log(categories);
          console.log(this.Pos);
          console.log(ProductArr);
          this.Ready=true;
          this.natStorage.setItem("POS",this.Pos);
                }
              },err=>{
                console.log(err);
              })
            }
            
          },err=>{
            console.log(err);
          })
        }
        
      },err=>{
        console.log(err);
      })
      
    })
    this.natStorage.getItem("user").then(data=>{
      this.user = data;
    },err=>{
      this.user = this.navParams.get('user');
      alert("Login Error please logout and Login again");
    })
    
  }
  openPage(page : any){
    if(this.user != undefined){
      this.navCtrl.push(RestaurantPage,{"restaurant":page , "user" : this.user,"restaurants" : this.Pos});
    }else{
      alert("Error please logout and Login again");
    }
    
  }

}
