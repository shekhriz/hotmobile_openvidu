import { Component, OnInit } from '@angular/core';
import { Platform, NavController,LoadingController,ModalController } from '@ionic/angular';

import { RestService } from '../providers/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  email:string;
  emailBKP:string;
  otp:string;
  isOTP:boolean = false;
  constructor(public navCtrl: NavController,public restProvider: RestService,public loadingCtrl: LoadingController,
    public modalCtrl : ModalController) {
  }

  async genarateOTP(){
    let loading = await this.loadingCtrl.create({
      //content: 'Please wait...'
    });

    if(this.email == undefined || this.email == ""){
      this.restProvider.showToast("Please enter email address.","ERROR");
      return;
    }
    if(!this.emailValidate(this.email)){
      this.restProvider.showToast("Email address is not valid.","ERROR");
      return;
    }

    await loading.present();
    this.restProvider.getOTP(this.email)
    .then(data => {
      this.isOTP = true;
      this.emailBKP = this.email;
      this.email = "";
      loading.dismiss();
      this.restProvider.showToast("OTP has been sent successfully to registered email.","SUCCESS");
      // console.log(data);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  reGenarateOTP(){
    this.isOTP = false;
    this.otp = "";
    this.email = "";
    this.emailBKP = "";
  }

  async login(){
    let loading =await this.loadingCtrl.create({
     // content: 'Please wait...'
    });
    if(this.otp == undefined || this.otp == ""){
      this.restProvider.showToast("Please enter OTP.","ERROR");
      return;
    }

    await loading.present();
    let jsonData = {
      "emailId": this.emailBKP,
      "id": 0,
      "otp": parseInt(this.otp)
    }

    this.restProvider.verifyOTP(jsonData)
    .then((data:any) => {
      loading.dismiss();
      if(data == "Email doesn't exist"){
        this.restProvider.showToast("Candidate is not associated with us.","ERROR");
        return
      }

      if(data == "Error"){
        this.restProvider.showToast("Please enter valid OTP.","ERROR");
        return
      }

      this.isOTP = false;
      this.otp = "";

      if(data.candidates.candidateId == null && data.reqDetailsForApp.length == 0){
        this.restProvider.showToast("Sorry you are not associated with us.","ERROR");
        return
      }

      if(data.reqDetailsForApp.length == 1){
        let JsonData = {
          'reqDetailsForApp'      :  data.reqDetailsForApp[0],
          'candidates'            :  data.candidates,
          'positionCandidates'    :  data.positionCandidates[0],
          'requirementDetailsBean':  data.requirementDetailsBean[0]
        }
        this.getInterviewDetails(JsonData.positionCandidates.candidateLink,JsonData);
      }else{
        this.restProvider.setRowData(data);
        //this.navCtrl.push(SelectRequirementPage);
        this.navCtrl.navigateForward('/SelectRequirement');
      }
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  async getInterviewDetails(uniqueId,JsonData){
    let loading =await this.loadingCtrl.create({
    //  content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getInterviewDetails(uniqueId)
    .then((candidateProperty:any) => {
      this.restProvider.getInterviewValidity(uniqueId)
        .then((response:any) => {
          loading.dismiss();
          if(response.candidateEnableDisable=='Enable'){
            if(response.status=='Open'){
                if(candidateProperty.linkValidity=='Active'){
                  this.restProvider.setCandidate(JsonData);
                  this.navCtrl.navigateForward('/RegisterPage');
                }else if(candidateProperty.linkValidity=='InActive'){
                    if(candidateProperty.linkExpired == "true"){
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'interviewLinkExpired'
                        }
                        this.navCtrl.navigateForward('/ShowStatusPage');
                    }else{
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'alreadyGivenInterview'
                        }
                        this.navCtrl.navigateForward('/ShowStatusPage');
                    }
                }
            }else if(response.status=='Closed'){
                let toast = {
                  reqName: JsonData.reqDetailsForApp.jobTitle,
                  status : 'requirementClosed'
                }
                this.navCtrl.navigateForward('/ShowStatusPage');
            }
          }else{
            let toast = {
              reqName: JsonData.reqDetailsForApp.jobTitle,
              status : 'candidateRemoved'
            }
            this.navCtrl.navigateForward('/ShowStatusPage');
          }

        },error => {
            console.log(error);
            loading.dismiss();
            this.restProvider.showToast("Something went wrong","ERROR");
        });
    },error => {
        console.log(error);
        loading.dismiss();
        this.restProvider.showToast("Something went wrong","ERROR");
    });
  }

   emailValidate(email) {
     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) == false){
          return false;
      }
      return true;
  }

  // async connectUs(mCode){
  //   var data = {
  //     code : mCode
  //   };
  //   var modalPage =await this.modalCtrl.create('ModalPage',data);
  //  await modalPage.present();
  // }

}

