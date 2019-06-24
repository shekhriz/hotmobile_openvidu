import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
//import { RestService } from '../providers/rest.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { RestService } from '../rest';

@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.page.html',
  styleUrls: ['./show-status.page.scss'],
})
export class ShowStatusPage  {
  messageObj:any=[];
  candidate:any;
  reqName:any;
  constructor(public navCtrl: NavController, public restProvider: RestService,
    public route:ActivatedRoute,
    public router: Router,
    public alertCtrl: AlertController,
    ) {
     // this.messageObj = this.navParams.get('msg');
      this.messageObj = route.snapshot.paramMap.get('queryParams');
      this.reqName = route.snapshot.paramMap.get('msg');

      console.log('status-------------', this.messageObj);
      console.log('reqName-------------', this.reqName);


      this.candidate = this.restProvider.getCandidate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowStatusPage');
  }

  finishInterview(){

    let jsonObject = {
      candidateInterviewResponseList:[],
      candidateInterviewSkippedResponseList:[]
    }
    this.restProvider.saveAllTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonObject)
    .then(data => {
      this.logout();
    },error => {
      this.logout();
    });
  }

  logout(){
   // this.navCtrl.push(HomePage);
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
