import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-video-timer-modal',
  templateUrl: './video-timer-modal.page.html',
  styleUrls: ['./video-timer-modal.page.scss'],
})
export class VideoTimerModalPage  {
  quest:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl : ModalController) {
    this.quest = this.navParams.get('text');
    this.startTimer();
  }

  ionViewDidLoad() {
  }

  startTimer(){
    var me = this;   
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft.toString();
    if(timeleft == 0){
       clearInterval(downloadTimer);
        me.viewCtrl.dismiss('START-RECORDING');
      }
    },1000);
  }
}
