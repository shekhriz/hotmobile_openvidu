import { Component, OnInit } from '@angular/core';
import { RestService } from '../../providers/rest.service';
import { Platform, NavController,AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.page.html',
  styleUrls: ['./common-header.page.scss'],
})
export class CommonHeaderPage {

  vid1:any;
  vid2:any;

  constructor(public navCtrl: NavController,public restProvider: RestService,public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public platform: Platform) {
      this.platform.ready().then((readySource) => {
        this.vid1 = document.getElementById("myVideo1");
        this.vid2 = document.getElementById("myVideo2");
      });
  
  }

  async logoutAlert() {
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });
    let alert =await this.alertCtrl.create({
        //title: 'Log-Out',
        message: 'Are you sure you want to Log-out ?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.logout();
                }
            }
        ]
    });
   await alert.present();
  }

  logout(){
   // this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

}

