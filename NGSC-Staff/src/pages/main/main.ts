import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListTableOrderPage} from '../list-table-order/list-table-order';
import { MyOrdersPage } from '../my-orders/my-orders';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public  listTable = ListTableOrderPage;
  public Home = HomePage;
  public orders = MyOrdersPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
