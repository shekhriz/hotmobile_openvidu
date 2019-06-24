import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
//import { RestService } from '../providers/rest.service';
import { Router } from '@angular/router';
import { ModalPage } from '../modal/modal.page';
import { RestService } from '../rest';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  candidate:any;
  vid1:any;
  vid2:any;

  constructor(public navCtrl: NavController,public restProvider: RestService, public modalCtrl : ModalController,
  public alertCtrl: AlertController,
  public platform: Platform,
  public router:Router) {
        this.candidate = this.restProvider.getCandidate();
        console.log(this.candidate);
  }

  ionViewDidLoad() {
    this.platform.ready().then((readySource) => {
      this.vid1 = document.getElementById("myVideo1");
      this.vid2 = document.getElementById("myVideo2");
    });
  }

  // async openModal(mCode){

  //   this.platform.ready().then((readySource) => {
  //     if(this.vid1 != null){
  //       this.vid1.pause();
  //     }
  //     if(this.vid2 != null){
  //       this.vid2.pause();
  //     }
  //   });

  //   var data = {
  //     code : mCode
  //   };
  //   // var modalPage =await this.modalCtrl.create('/ModalPage',data);
  //   // await modalPage.present();
  // console.log('mCode',mCode);
  //   var modalPage = await this.modalCtrl.create({
  //     component: ModalPage,
  //     componentProps: { value:data }
  //   });
  //   await modalPage.present();
  // }
  async openModal(mCode) {
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });

    var data = {
      code : mCode
    };

   console.log('mCode',mCode);

    const modal = await this.modalCtrl.create({
      component: ModalPage,
    componentProps: {value: mCode}


    });
  modal.present();
  }
//  async openModal(mCode) {
//     this.platform.ready().then((readySource) => {
//       if(this.vid1 != null){
//         this.vid1.pause();
//       }
//       if(this.vid2 != null){
//         this.vid2.pause();
//       }
//     });

//     var data = {
//       code : mCode
//     };
    
//    console.log('mCode',mCode);

//     const modal = await this.modalCtrl.create({
//       component: ModalPage,
//     componentProps: {value: mCode}
    
    
//     });
//   modal.present();
//   }
  gotoSkillsRatePage(){
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });
    this.selectNextRoute();
  }

  selectNextRoute(){
    this.restProvider.getInterviewStatus(this.candidate.positionCandidates.candidateLink)
    .then((status:any) => {
      if(status == null || status == "general" || status == "new"){
         //this.navCtrl.push(GeneralQuestionPage);
         this.router.navigate(['/GeneralQuestion']);
      }else if(status == "skills"){
        //this.navCtrl.push(RateSkillsPage);
        this.router.navigate(['/RateSkills']);

      }else if(status == "technical"){
        //this.navCtrl.push(QuestionPage);
        this.router.navigate(['/question']);
      }
    },error => {
        console.log(error);
    });
  }
  logout(){
    //  this.navCtrl.push(HomePage);
      this.router.navigate(['/home']);
      this.restProvider.removeCandidate();
    }
  async logoutAlert() {
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
    alert.present();
  }

}
