import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage} from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { RootProvider} from '../root/root';

/*
  Generated class for the PosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PosProvider extends RootProvider {
  private GetCategory : string="GetCategory";
  private GetProduct : string="GetProduct";
  private InvoiceHeader: string="AddInvoiceHeader_MobileBased";
  private InvoiceItem: string = "AddInvoiceItem_MobileBased";
  private getPos :string = "getPos";
  constructor(public http: Http , public natStorage : NativeStorage) {
    super(http,natStorage);
    console.log('Hello PosProvider Provider');
  }

  public get_category():Observable<any>{
    return this.get_http(`${this.CONFIG.API}${this.GetCategory}`).map(res=><any>res.json());
   }
   public get_products():Observable<any>{
     return this.get_http(`${this.CONFIG.API}${this.GetProduct}`).map(res=><any>res.json());
 
   }
   public get_Pos():Observable<any>{
     return this.get_http(`${this.CONFIG.API}${this.getPos}`).map(res=><any>res.json());
   }
   public add_invoice_header(item_count:any,total_price:any,id:any,rfid:any,pMethod:any,user_id:any,pointID:any,order_status:any,deliver_to:any,tableCode:any,ToGo:any) : Observable<any>{
     return  this.http.get(`${this.CONFIG.API}${this.InvoiceHeader}?item_count=${item_count}&total_price=${total_price}&id=${id}&rfid=${rfid}&pMethod=${pMethod}&user_id=${user_id}&pointID=${pointID}&order_status=${order_status}&deliver_to=${deliver_to}&tableCode=${tableCode}&ToGo=${ToGo}`).map(res=><any>res.json());
   }
   public add_invoice_item(category_id:any,prod_id:any,quatity:any,price:any,id:any ,rfid:any ,pMethod :any,invNo:any,order_status:any,deliver_to:any,table_no:any,order_comments:any):Observable<any>{
     return this.http.get(`${this.CONFIG.API}${this.InvoiceItem}?category_id=${category_id}&prod_id=${prod_id}&quatity=${quatity}&price=${price}&id=${id}&rfid=${rfid}&pMethod=${pMethod}&invNo=${invNo}&order_status=${order_status}&deliver_to=${deliver_to}&table_no=${table_no}&order_comments=${order_comments}`).map(res=> <any>res.json());
   }
}
