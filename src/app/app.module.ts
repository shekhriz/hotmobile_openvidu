import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonicStorageModule } from '@ionic/storage';
//import { NumberToTextPipe } from './number-to-text.pipe';
import { ModalPageModule } from './modal/modal.module';

import { VideoTimerModalPageModule } from './video-timer-modal/video-timer-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ModalPageModule,
    VideoTimerModalPageModule,
   
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { HttpClientModule } from '@angular/common/http';
// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { ExampleModalPageModule } from './example-modal/example-modal.module';
 
// @NgModule({
//   declarations: [AppComponent],
//   entryComponents: [],
//   imports: [BrowserModule, 
//     IonicModule.forRoot(), 
//     AppRoutingModule,
//     ExampleModalPageModule,
//     HttpClientModule
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}
