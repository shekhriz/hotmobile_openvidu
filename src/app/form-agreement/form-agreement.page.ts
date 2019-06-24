import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
//import { RestService } from '../providers/rest.service';
import { RestService } from '../rest';

import { Router ,ActivatedRoute} from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
@Component({
  selector: 'app-form-agreement',
  templateUrl: './form-agreement.page.html',
  styleUrls: ['./form-agreement.page.scss'],
})
export class FormAgreementPage {
  status:any;
  cId:string;
  reqId:string;
  videoAgreementDate:string;
  videoAgreementStatus:string;
  constructor(public navCtrl: NavController, public restProvider: RestService,
    public router: Router,
    public route:ActivatedRoute,
    public alertCtrl:AlertController) {
  
   this.status = route.snapshot.paramMap.get('status');
   this.cId = route.snapshot.paramMap.get('CId');
   this.reqId = route.snapshot.paramMap.get('reqid');
  // this.cId = navParams.get('CId');
   //this.reqId = navParams.get('reqid');
  
   console.log("form.status",this.status);
   console.log("this.status",this.cId);
   console.log("this.status",this.reqId);
   // console.log("CId",this.CId);
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAgreementPage');
  }

  agree(){
    if( this.status == null){
        let jsonData3={
          'cId': this.cId,
          'reqId': this.reqId,
          'videoAgreementDate': this.restProvider.getTokenTime(),
          'videoAgreementStatus':'true',
        }
        console.log('jsonData3',jsonData3);
        console.log('hhhhhhhhhhhhhhhhhhh');
    
        this.restProvider.agreement(jsonData3)
        .then((res:any) => {
          
            this.restProvider.interviewAgreement(this.reqId,this.cId)
            .then((status:any) => {
              this.status = status;
            if(this.status.videoAgreementStatus == 'true'){
              
           // this.navCtrl.push(PolicyAgreementPage,{status:this.status});
             this.router.navigate(['/PolicyAgreement',{cId:this.status.cId,reqId:this.status.reqId}]);
            console.log('cId',this.status.cId);
            console.log('cId',this.status.reqId);

          }
            },error => {
                console.log(error);
            });
        
        },error => {
            console.log(error);
        }); 
    }else if( this.status.videoAgreementDate == "null"){
      let jsonData3={
        'cId': this.cId,
        'reqId': this.reqId,
        'videoAgreementDate': this.restProvider.getTokenTime(),
        'videoAgreementStatus':'true',
      }
      console.log('jsonData3',jsonData3);
      console.log('vvvvvvvvvvvvvvvvvvvvvvv');
  
      this.restProvider.agreement(jsonData3)
      .then((res:any) => {
        
          this.restProvider.interviewAgreement(this.reqId,this.cId)
          .then((status:any) => {
            this.status = status;
          if(this.status.videoAgreementStatus == 'true' && this.status.emplyomentStatus == 'true' ){
            
         // this.navCtrl.push(RegisterPage,{status:this.status});
          this.router.navigate(['/register',{status:this.status}]);

        }
          },error => {
              console.log(error);
          });
      
      },error => {
          console.log(error);
      }); 
    }else if( this.status != null){
      let jsonData3={
       
        'cId': this.status.cId,
        'reqId': this.status.reqId,
        'videoAgreementDate': this.status.videoAgreementDate,
        'videoAgreementStatus':this.status.videoAgreementStatus,
      }
      console.log('jsonData3',jsonData3);
      console.log('ooooooooooooo');
  
      this.restProvider.agreement(jsonData3)
      .then((res:any) => {
        
          this.restProvider.interviewAgreement(this.reqId,this.cId)
          .then((status:any) => {
            this.status = status;
          if(this.status.videoAgreementStatus == 'true'){
            
         // this.navCtrl.push(PolicyAgreementPage,{status:this.status});
          this.router.navigate(['/PolicyAgreement',{status:this.status}]);

        }
          },error => {
              console.log(error);
          });
      
      },error => {
          console.log(error);
      }); 
    }

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

