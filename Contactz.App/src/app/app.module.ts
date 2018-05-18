import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { ContactsPage } from '../pages/contacts/contacts';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactService } from '../providers/contact-service/contact-service';

// import {InputMask} from '../components/InputMask/InputMask';

@NgModule({
  declarations: [
    MyApp,
    ContactsPage,
    ContactDetailsPage,
    AboutPage,
    // InputMask
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactsPage,
    ContactDetailsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactService
  ]
})
export class AppModule {}
