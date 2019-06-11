import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,ModalController,LoadingController } from '@ionic/angular';
import { ExampleModalPage } from '../example-modal/example-modal.page'
 
@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage  {
  dataReturned:any;
 
  constructor(
    public modalController: ModalController
  ) { }
 
  async openModal() {
    const modal = await this.modalController.create({
      component: ExampleModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }
}