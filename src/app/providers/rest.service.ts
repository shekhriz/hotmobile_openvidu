import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import {ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
    apiUrl = 'https://qa.hookedontalent.com/';
    // apiUrl = '/';
    constructor(public http: HttpClient,private toastCtrl: ToastController) {
    }
  
  // APIs
    getOTP(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'otpGeneration', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    verifyOTP(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'otpVerification', JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    addFeedback(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/feedback/'+data.uniqueId, JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    addCandFeedback(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/feedback/fromMobile', JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    saveSkills(uniqueId,data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/questions/skills/response/'+uniqueId, JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    getInterviewStatus(uniqueId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlab/interview/getInterviewStatus/'+uniqueId).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    setInterviewStatus(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/setInterviewStatus', JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    getGenaralQuestions(uniqueId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlab/interview/questions/general/'+uniqueId).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    saveGenaralQuestions(uniqueId,data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/questions/general/response/'+uniqueId, JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    getTechnicalQuestions(uniqueId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlab/interview/questions/technical/exclude/'+uniqueId).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    saveTechnicalQuestion(uniqueId,data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/questions/technical/save/response/'+uniqueId, JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    saveAllTechnicalQuestion(uniqueId,data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/questions/technical/response/'+uniqueId, JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    saveVideoQuestion(uniqueId,qId,blob) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlab/interview/upload/video/'+qId+'/'+uniqueId, blob,{
          headers: new HttpHeaders().set('Content-Type', 'video/webm')
        }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    saveVideoQuestionByfile(uniqueId,qId,file) {
      console.log(file);
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'/hotlab/user/uploadVideoFromMobile/'+uniqueId+'/'+qId, file,{
          headers: new HttpHeaders().set('Content-Type', 'video/mp4')
        }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    getInterviewDetails(uniqueId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlab/interview/details/'+uniqueId).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    getInterviewValidity(uniqueId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlab/interview/validity/'+uniqueId).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
  
  // Code for Toaster
    showToast(msg,type) {
        if(type == 'ERROR'){
          let toast = this.toastCtrl.create({
             message: msg,
             duration: 3000,
             position: 'top',
             showCloseButton: true,
             cssClass: "toastCssError",
            }).then(toast=> toast.present());
        }else if(type == 'SUCCESS'){
          let toast = this.toastCtrl.create({
             message: msg,
             duration: 3000,
             position: 'top',
             showCloseButton: true,
             cssClass: "toastCssSuccess",
            }).then(toast=> toast.present());
           
        }
    }
  
  // Login User Handling
    getCandidate(){
      return JSON.parse(window.localStorage.getItem('loginCandidate'));
    }
    setCandidate(candidate){
      window.localStorage.setItem( 'loginCandidate',JSON.stringify(candidate));
    }
  
    getRowData(){
      return JSON.parse(window.localStorage.getItem('rowData'));
    }
    setRowData(rowData){
      window.localStorage.setItem( 'rowData',JSON.stringify(rowData));
    }
  
    removeCandidate(){
      window.localStorage.setItem( 'loginCandidate',null);
      window.localStorage.setItem( 'rowData',null);
    }
    interviewAgreement(PId,CId) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'hotlabs/req/get/interview/agreement/'+PId+'/'+CId,{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
                                    .append('Accept', 'application/json;odata=verbose')
                                    .append('Content-Type','application/json')
        }).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    
    agreement(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'hotlabs/req/interview/agreement', JSON.stringify(data),{
          headers: new HttpHeaders().set('Content-Type', 'application/json')
         }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    getTokenTime(){
      return JSON.parse(window.localStorage.getItem('userTokenStartTime'));
    }
  }
  
  
