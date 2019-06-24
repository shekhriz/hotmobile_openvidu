import { Component, OnInit } from '@angular/core';
//import { RestService } from '../providers/rest.service';
import { RestService } from '../rest';

import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-requirement',
  templateUrl: './select-requirement.page.html',
  styleUrls: ['./select-requirement.page.scss'],
})
export class SelectRequirementPage {

  data:any;
  requirement:string='';
  reqDetailsForApp:Array<Object> = [];
  requirementDetailsBean:any={};
  tempArray:Array<Object> = [];
  submissionType:string;
  details:any;


  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    public restProvider: RestService,
    public router:Router,
    public alertCtrl:AlertController) {
    this.data = this.restProvider.getRowData();
    this.reqDetailsForApp = this.data.reqDetailsForApp;
  }   

  ionViewDidLoad() {
  }

  onSelectChange(selectedValue) {
    
    console.log('Selected', selectedValue);
    this.submissionType = selectedValue;
    console.log("adyasa",this.submissionType); 
    
    
  }

  submitReq(id){``
    console.log('id',id);
    let _id = parseInt(id);
    let JsonData = {
      'reqDetailsForApp':this.searchRow(_id,this.data.reqDetailsForApp),
      'candidates':this.data.candidates,
      'positionCandidates':this.searchRow(_id,this.data.positionCandidates),
      
      'requirementDetailsBean':this.searchRow(_id,this.data.requirementDetailsBean),
    }
 
    this.getInterviewDetails(JsonData.positionCandidates.candidateLink,JsonData);
    
    this.restProvider.interviewAgreement( this.submissionType,this.data.candidates.candidateId)
                  .then((status:any) => {
                    this.details = status
                    console.log("status",status);
                   if(this.details != null){
                     // this.navCtrl.push(FormAgreementPage,{reqid: this.submissionType,CId:this.data.candidates.candidateId,status:this.details });
                        if(this.details.videoAgreementStatus !=  "true" ){
                          //this.navCtrl.push(FormAgreementPage,{status:this.details,CId:this.data.candidates.candidateId,reqid:this.submissionType});
                           this.router.navigate(['/FormAgreement',{status:this.details,CId:this.data.candidates.candidateId,reqid:this.submissionType}]);

                        console.log('videoAgreementStatus',this.details.videoAgreementStatus);

                        }else if(this.details.emplyomentStatus !=  "true"){
                         // this.navCtrl.push(PolicyAgreementPage,{status:this.details,cId:this.details.cId,reqId:this.details.reqId});
                          this.router.navigate(['/PolicyAgreement',{status:this.details,cId:this.details.cId,reqId:this.details.reqId}]);

                        console.log('PolicyAgreementPage',this.details.PolicyAgreementPage);

                        }else if(this.details.videoAgreementStatus ==  "true" && this.details.emplyomentStatus ==  "true"){
                         this.router.navigate(['/register']);

                          //this.navCtrl.push(RegisterPage);
                        }
                        console.log('mmmmmmmmmmmm',this.data.candidates.candidateId);
                        console.log('hello' );
                     }else{
                     // this.navCtrl.push(FormAgreementPage,{reqid: this.submissionType,CId:this.data.candidates.candidateId });
                      this.router.navigate(['/FormAgreement',{reqid: this.submissionType,CId:this.data.candidates.candidateId}]);

                        console.log('dddddddddddd',this.data.candidates.candidateId);

                     }
                    
                  },error => {
                      console.log(error);
                  });
  }

  searchRow(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].positionId === nameKey) {
            return myArray[i];
          }
      }
  }


  getInterviewDetails(uniqueId,JsonData){
    console.log('uniqueId',uniqueId);
    console.log('JsonData',JsonData);
    let loading = this.loadingCtrl.create({
      
    });
    //loading.present();
    this.restProvider.getInterviewDetails(uniqueId)
    .then((candidateProperty:any) => {
      this.restProvider.getInterviewValidity(uniqueId)
        .then((response:any) => {
         // loading.dismiss();
          if(response.candidateEnableDisable=='Enable'){
            if(response.status=='Open'){
                if(candidateProperty.linkValidity=='Active'){

                  this.restProvider.setCandidate(JsonData);
                 
                }else if(candidateProperty.linkValidity=='InActive'){
                    if(candidateProperty.linkExpired == "true"){
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'interviewLinkExpired'
                        }
                        //this.navCtrl.push(ShowStatusPage,{msg:toast});
                      //  this.router.navigate(['/ShowStatus',{msg:toast}]);
                        this.router.navigate(['ShowStatus'], { queryParams: toast});
                        console.log('queryParams',{ queryParams: toast});
                    }else{
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'alreadyGivenInterview'
                        }
                        //this.navCtrl.push(ShowStatusPage,{msg:toast});
                        this.router.navigate(['ShowStatus'],{queryParams:toast});
                        console.log('queryParams',{ queryParams: toast});

                    }
                }
            }else if(response.status=='Closed'){
                let toast = {
                  reqName: JsonData.reqDetailsForApp.jobTitle,
                  status : 'requirementClosed'
                }
               // this.navCtrl.push(ShowStatusPage,{msg:toast});
                this.router.navigate(['ShowStatus'],{queryParams:toast});
                console.log('queryParams',{ queryParams: toast});

            }
          }else{
            let toast = {
              reqName: JsonData.reqDetailsForApp.jobTitle,
              status : 'candidateRemoved'
            }
           // this.navCtrl.push(ShowStatusPage,{msg:toast});
            this.router.navigate(['ShowStatus'],{queryParams:toast});
                        console.log('queryParams',{ queryParams: toast});
            
          }

        },error => {
            console.log(error);
           // loading.dismiss();
            this.restProvider.showToast("Something went wrong","ERROR");
        });
    },error => {
        console.log(error);
        //loading.dismiss();
        this.restProvider.showToast("Something went wrong","ERROR");
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
