import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
 
@Component({
  selector: 'app-divmodal',
  templateUrl: './divmodal.page.html',
  styleUrls: ['./divmodal.page.scss'],
})
export class DivmodalPage implements OnInit {
  modalTitle:string;
  modelId:number;
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }
 
  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramTitle;
    this.modalTitle = this.navParams.data.paramID;
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
