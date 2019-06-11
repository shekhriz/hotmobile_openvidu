import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
import { RestService } from '../providers/rest.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-rate-skills',
  templateUrl: './rate-skills.page.html',
  styleUrls: ['./rate-skills.page.scss'],
})
export class RateSkillsPage  {
  candidate:any;
  reqSkills:Array<Object> = [];
  constructor(public navCtrl: NavController,
    public restProvider: RestService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router) {
      this.candidate = this.restProvider.getCandidate();
      
      let pSkills = this.candidate.requirementDetailsBean.primarySkill.split(',');  
      let sSkills = this.candidate.requirementDetailsBean.secondarySkill.split(',');
      Object.keys(pSkills).forEach(key=> {
        if(pSkills[key] != ""){
          this.reqSkills.push({
            "skills":pSkills[key],
            "score":0
          })
        }
      });
      Object.keys(sSkills).forEach(key=> {
        if(sSkills[key] != ""){
          this.reqSkills.push({
            "skills":sSkills[key],
            "score":0
          })
        }
      });
      // console.log(this.reqSkills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSkillsPage');
  }

  
  async gotoQuestionPage(){
    let loading =await this.loadingCtrl.create({
     // content: 'Please wait...'
    });

    loading.present();
    this.restProvider.saveSkills(this.candidate.positionCandidates.candidateLink,this.reqSkills)
    .then(data => {
      // SET INTERVIEW STATUS
      let statusData = {
        uniqueId:this.candidate.positionCandidates.candidateLink,
        interviewStatus:"technical"
      }
      this.restProvider.setInterviewStatus(statusData)
      .then(res=>{},error=>{});
      loading.dismiss();
      this.restProvider.showToast("Skills saved successfully.","SUCCESS");
     // this.navCtrl.push(QuestionPage);
      this.router.navigate(['/question']);

    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
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

