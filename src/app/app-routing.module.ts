import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'SelectRequirement', loadChildren: './select-requirement/select-requirement.module#SelectRequirementPageModule' },
  { path: 'video-rec', loadChildren: './video-rec/video-rec.module#VideoRecPageModule' },
  { path: 'ShowStatus', loadChildren: './show-status/show-status.module#ShowStatusPageModule' },
  { path: 'common-header', loadChildren: './component/common-header/common-header.module#CommonHeaderPageModule' },
  //{ path: 'GeneralQuestion', loadChildren: './general-question/general-question.module#GeneralQuestionPageModule' },
  //{ path: 'RateSkills', loadChildren: './rate-skills/rate-skills.module#RateSkillsPageModule' },
  //{ path: 'Question', loadChildren: './question/question.module#QuestionPageModule' },
  { path: 'RateSkills', loadChildren: './rate-skills/rate-skills.module#RateSkillsPageModule' },
  { path: 'question', loadChildren: './question/question.module#QuestionPageModule' },
  { path: 'GeneralQuestion', loadChildren: './general-question/general-question.module#GeneralQuestionPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'VideoTimerModal', loadChildren: './video-timer-modal/video-timer-modal.module#VideoTimerModalPageModule' },
  { path: 'FormAgreement', loadChildren: './form-agreement/form-agreement.module#FormAgreementPageModule' },
  { path: 'PolicyAgreement', loadChildren: './policy-agreement/policy-agreement.module#PolicyAgreementPageModule' },
  { path: 'divmodal', loadChildren: './divmodal/divmodal.module#DivmodalPageModule' },
  { path: 'button', loadChildren: './button/button.module#ButtonPageModule' },
  { path: 'example-modal', loadChildren: './example-modal/example-modal.module#ExampleModalPageModule' },

  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
