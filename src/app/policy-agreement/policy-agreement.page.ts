import { Component, OnInit } from '@angular/core';
//import { RestService } from '../providers/rest.service';
import { RestService } from '../rest';

import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-policy-agreement',
  templateUrl: './policy-agreement.page.html',
  styleUrls: ['./policy-agreement.page.scss'],
})
export class PolicyAgreementPage {
  status:any;
  cId:string;
  reqId:string;
  constructor(public navCtrl: NavController,public restProvider: RestService,
    public route:ActivatedRoute,
    public alertCtrl: AlertController,
    public router:Router) {
  // this.status = route.snapshot.paramMap.get('status');
   this.cId = route.snapshot.paramMap.get('cId');
   this.reqId = route.snapshot.paramMap.get('reqId');
    
  //  this.status = navParams.get('status');
  //  this.cId = navParams.get('CId');
  //  this.reqId = navParams.get('reqid');
   console.log('status', this.status);
   console.log('cId', this.cId);
   console.log('reqId', this.reqId);
  // console.log('jsonData3', this.status.videoAgreementDate);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyAgreementPage');
  }

  agree(){
 

  let jsonData3={
            'cId': this.cId,
            'reqId': this.reqId,
            'emplyomentDate': this.restProvider.getTokenTime(),
            'emplyomentStatus':'true',
          }
          console.log('jsonData3',jsonData3);
      
          this.restProvider.agreement(jsonData3)
          .then((status:any) => {
            this.restProvider.interviewAgreement(this.reqId,this.cId)
            .then((status:any) => {
              this.status = status;
            if(this.status.emplyomentStatus == 'true'){
              
            //this.navCtrl.push(RegisterPage,{status:this.status});
             this.router.navigate(['/register',{reqId:this.reqId,cId:this.cId}]);

          }
            },error => {
                console.log(error);
            });
           
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

