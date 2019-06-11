import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RateSkillsPage } from './rate-skills.page';
import { NumberToTextPipe } from '../number-to-text.pipe';

const routes: Routes = [
  {
    path: '',
    component: RateSkillsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RateSkillsPage,NumberToTextPipe]
})
export class RateSkillsPageModule {}
