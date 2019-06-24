import { Component } from '@angular/core';

import { Platform ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './providers/rest.service';
import { SelectRequirementPage } from './select-requirement/select-requirement.page';
import { RegisterPage } from './register/register.page';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage:any;
  rowData:any;
  candidateData:any;  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public restProvider: RestService,  
    public alertCtrl: AlertController) { 
    platform.ready().then(() => {
      this.rowData = this.restProvider.getRowData();
      this.candidateData = this.restProvider.getCandidate();
      if(this.rowData != null){
        this.rootPage = SelectRequirementPage;
      }else{  
          if(this.candidateData != null){
            this.rootPage = RegisterPage;
          }else{
            this.rootPage = HomePage;
          }
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // platform.registerBackButtonAction(() => {
      //       const alert = this.alertCtrl.create({
      //           title: 'Close Application',
      //           message: 'Are you sure you want to close application?',
      //           buttons: [{
      //               text: 'NO',
      //               role: 'NO',
      //               handler: () => {
      //                   console.log('Application exit prevented!');
      //               }
      //           },{
      //               text: 'YES',
      //               handler: () => {
      //                   platform.exitApp();
      //               }
      //           }]
      //       });
      //       alert.present();
      //   });


        platform.ready().then(() => {
          document.addEventListener("backbutton",async () => { 
           const alert = await this.alertCtrl.create({
            //  title: 'Close Application',
              message: 'Are you sure you want to close application?',
              buttons: [{
                  text: 'NO',
                  role: 'NO',
                  handler: () => {
                      console.log('Application exit prevented!');
                  }
              },{
                  text: 'YES',
                  handler: () => {
                    navigator['app'].exitApp();
                  }
              }]
          });
          alert.present();
          });
        });
        
    });
  }
}
//   constructor(
//     private platform: Platform,
//     private splashScreen: SplashScreen,
//     private statusBar: StatusBar
//   ) {
//     this.initializeApp();
//   }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       this.statusBar.styleDefault();
//       this.splashScreen.hide();
//     });
//   }
// }
