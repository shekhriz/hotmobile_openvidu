import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
import { RestService } from '../providers/rest.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-general-question',
  templateUrl: './general-question.page.html',
  styleUrls: ['./general-question.page.scss'],
})
export class GeneralQuestionPage  {
  candidate:any;
  questions:any;
  constructor(public navCtrl: NavController, 
    public restProvider: RestService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router : Router) {
      this.candidate = this.restProvider.getCandidate();
      this.getGenaralQuestions(this.candidate.positionCandidates.candidateLink);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionPage');
  }

 async gotoRateskill(){

    let loading =await this.loadingCtrl.create({
      //content: 'Please wait...'
    });

    let intrRes = [];
    let intrSkippedRes = [];
    Object.keys(this.questions).forEach(key=> {
      if(this.questions[key].response == ""){
        intrSkippedRes.push({
          'questionId': this.questions[key].id,
          'type': this.questions[key].type
        });
      }else{
        intrRes.push({
          'questionId': this.questions[key].id,
          'response': this.questions[key].response
        });
      }
    });

    let jsonObject = {
      candidateInterviewResponseList:intrRes,
      candidateInterviewSkippedResponseList:intrSkippedRes
    }

    loading.present();
    this.restProvider.saveGenaralQuestions(this.candidate.positionCandidates.candidateLink,jsonObject)
    .then(data => {
      let statusData = {
        uniqueId:this.candidate.positionCandidates.candidateLink,
        interviewStatus:"skills"
      }
      this.restProvider.setInterviewStatus(statusData)
      .then(res=>{},error=>{});
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      //this.navCtrl.push(RateSkillsPage);
      this.router.navigate(['/RateSkills']);

    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }


  

  async getGenaralQuestions(uniqueId){
    let loading =await this.loadingCtrl.create({
     // content: 'Please wait...'
    });

    loading.present();
    this.restProvider.getGenaralQuestions(uniqueId)
    .then((data:any) => {
      if(data.length == 0){
        //this.navCtrl.push(RateSkillsPage);
        this.router.navigate(['/RateSkills']);

      }
      loading.dismiss();
      this.questions = [];
      Object.keys(data).forEach(key=> {
          data[key].response = '';
          this.questions.push(data[key]);
      });
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Error for getting Interview status.","ERROR");
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

