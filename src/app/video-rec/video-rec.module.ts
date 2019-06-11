import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideoRecPage } from './video-rec.page';
// import { OpenViduVideoComponent } from '../ov-video.component';
// import { UserVideoComponent } from '../user-video.component';
const routes: Routes = [
  {
    path: '',
    component: VideoRecPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideoRecPage]
})
export class VideoRecPageModule {}
