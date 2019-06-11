import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PolicyAgreementPage } from './policy-agreement.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyAgreementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PolicyAgreementPage]
})
export class PolicyAgreementPageModule {}
