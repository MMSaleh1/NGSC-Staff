import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';

import { HeaderComponent } from '../components/header/header';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { OrderPage } from '../pages/order/order';
import { LoginPage} from '../pages/login/login';
import { MainPage} from '../pages/main/main';
import { ListTableOrderPage} from '../pages/list-table-order/list-table-order';
import { MyOrdersPage} from '../pages/my-orders/my-orders';

import { PosProvider } from '../providers/pos/pos';
import { RootProvider } from '../providers/root/root';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeaderComponent,
    RestaurantPage,
    OrderPage,
    LoginPage,
    MainPage,
    ListTableOrderPage,
    MyOrdersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestaurantPage,
    OrderPage,
    LoginPage,
    MainPage,
    ListTableOrderPage,
    MyOrdersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PosProvider,
    RootProvider,
    UserProvider
  ]
})
export class AppModule {}
