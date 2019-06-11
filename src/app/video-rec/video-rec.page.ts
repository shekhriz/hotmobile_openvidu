import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
declare var cordova;
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-rec',
  templateUrl: './video-rec.page.html',
  styleUrls: ['./video-rec.page.scss'],
})
export class VideoRecPage implements OnDestroy {
  OPENVIDU_SERVER_URL = 'https://' + '172.16.19.3' + ':4443';
  OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  ANDROID_PERMISSIONS = [
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.RECORD_AUDIO,
      this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS
  ];

  // OpenVidu objects
  OV: OpenVidu;
  session: Session;
  publisher: StreamManager; // Local
  subscribers: StreamManager[] = []; // Remotes

  // Join form
  mySessionId: string;
  myUserName: string;
  stream:any;
  mediaStream:any;
  recording_id:string;
  recording_name:string;
  recording_url:string;
  record_details:any;
  streamId: string;
  
  sessionId: string;
  createdAt: number;
  url: string;
  mySessionId2:any;
  
  activeBTN = 1;


  timeBegan = null
  timeStopped:any = null
  stoppedDuration:any = 0
  started = null
  running = false
  blankTime = "00:00.00"
  time = "00:00.00"

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private httpClient: HttpClient,
      private androidPermissions: AndroidPermissions,
      public alertController: AlertController,
      public router: Router
  ) {
      this.initializeApp();
      this.generateParticipantInfo();
  }

  initializeApp() {
      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          if (this.platform.is('ios') && this.platform.is('cordova')) {
              this.initializeAdapterIosRtc();
          }
      });
  }

  initializeAdapterIosRtc() {
      console.log('Initializing iosrct');
      cordova.plugins.iosrtc.registerGlobals();
      // load adapter.js (version 4.0.1)
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = 'assets/libs/adapter-4.0.1.js';
      script2.async = true;
      document.head.appendChild(script2);
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
      // On window closed leave session
     // this.leaveSession();
      
  }

  ngOnDestroy() {
      // On component destroyed leave session
     // this.leaveSession();
  }

  joinSession(num) {
      // --- 1) Get an OpenVidu object ---
      this.activeBTN = num;
      this.OV = new OpenVidu();
      console.log('this.OV',this.OV);


      this.session = this.OV.initSession();

    
      this.session.on('streamCreated', (event: StreamEvent) => {
         
          const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
          this.subscribers.push(subscriber);
      });

     
      this.session.on('streamDestroyed', (event: StreamEvent) => {
        
          this.deleteSubscriber(event.stream.streamManager);
      });

    
      this.getToken().then((token) => {
       
          this.session
              .connect(token, { clientData: this.myUserName })
              .then(() => {
                return new Promise((resolve, reject) => {
                    const body = JSON.stringify({ session: this.mySessionId2,"recording": true,"outputMode": "INDIVIDUAL", "recordingLayout": "CUSTOM"});
                    console.log('body',body);
                    const options = {
                        headers: new HttpHeaders({
                            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                            'Content-Type': 'application/json',
                        }),
                    };
                    return this.httpClient
                        .post(this.OPENVIDU_SERVER_URL+'/api/recordings/start', body, options)
                        .pipe(
                            catchError((error) => {
                                reject(error);
                                return observableThrowError(error);
                            }),
                        )
                        .subscribe((response) => {
                            console.log('response',response);
                            this.record_details = response;
                            this.recording_id = this.record_details.id;
                            if(this.running) return;
                            if (this.timeBegan === null) {
                               // this.reset();
                                this.timeBegan = new Date();
                            }
                            if (this.timeStopped !== null) {
                              let newStoppedDuration:any = (+new Date() - this.timeStopped)
                              this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
                            }
                            this.started = setInterval(this.clockRunning.bind(this), 10);
                              this.running = true;
                              console.log('this.recordingid',this.recording_id);
                    
                            resolve(response['token']);

                            if (this.platform.is('cordova')) {
                                // Ionic platform
                                if (this.platform.is('android')) {
                                    console.log('Android platform');
                                    this.checkAndroidPermissions()
                                        .then(() => this.initPublisher())
                                        .catch(err => console.error(err));
                                } else if (this.platform.is('ios')) {
                                    console.log('iOS platform');
                                    this.initPublisher();
                                }
                            } else {
                                this.initPublisher();
                            }
                        });
                  
                });
                   
              })
              .catch(error => {
                  console.log('There was an error connecting to the session:', error.code, error.message);
              });
      });
  }
 
      
  
  initPublisher() {
      // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
      // element: we will manage it on our own) and with the desired properties
      const publisher: Publisher = this.OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: true ,
           
          // Whether to mirror your local video or not
      });

      // --- 6) Publish your stream ---

      this.session.publish(publisher).then(() => {
          // Store our Publisher
          this.publisher = publisher;
          this.stream = this.publisher.stream;
          this.mediaStream =  this.stream.mediaStream;
         // this.recordingid = this.mediaStream.id;
          
         
          console.log('this.publisher',this.publisher);
          console.log('this.stream',this.stream);
          //console.log('this.recordingid',this.recordingid);
          console.log('this.mediaStream',this.mediaStream);


      });
  }

 

  refreshVideos() {
      if (this.platform.is('ios') && this.platform.is('cordova')) {
          cordova.plugins.iosrtc.refreshVideos();
      }
  }

  private checkAndroidPermissions(): Promise<any> {
      return new Promise((resolve, reject) => {
          this.platform.ready().then(() => {
              this.androidPermissions
                  .requestPermissions(this.ANDROID_PERMISSIONS)
                  .then(() => {
                      this.androidPermissions
                          .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
                          .then(camera => {
                              this.androidPermissions
                                  .checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
                                  .then(audio => {
                                      this.androidPermissions
                                          .checkPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS)
                                          .then(modifyAudio => {
                                              if (camera.hasPermission && audio.hasPermission && modifyAudio.hasPermission) {
                                                  resolve();
                                              } else {
                                                  reject(
                                                      new Error(
                                                          'Permissions denied: ' +
                                                          '\n' +
                                                          ' CAMERA = ' +
                                                          camera.hasPermission +
                                                          '\n' +
                                                          ' AUDIO = ' +
                                                          audio.hasPermission +
                                                          '\n' +
                                                          ' AUDIO_SETTINGS = ' +
                                                          modifyAudio.hasPermission,
                                                      ),
                                                  );
                                              }
                                          })
                                          .catch(err => {
                                              console.error(
                                                  'Checking permission ' +
                                                  this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS +
                                                  ' failed',
                                              );
                                              reject(err);
                                          });
                                  })
                                  .catch(err => {
                                      console.error(
                                          'Checking permission ' + this.androidPermissions.PERMISSION.RECORD_AUDIO + ' failed',
                                      );
                                      reject(err);
                                  });
                          })
                          .catch(err => {
                              console.error('Checking permission ' + this.androidPermissions.PERMISSION.CAMERA + ' failed');
                              reject(err);
                          });
                  })
                  .catch(err => console.error('Error requesting permissions: ', err));
          });
      });
  }

  private generateParticipantInfo() {
      // Random user nickname and sessionId
      this.mySessionId = 'SessionA';
      this.myUserName = 'Participant' + Math.floor(Math.random() * 100);
  }

  private deleteSubscriber(streamManager: StreamManager): void {
      const index = this.subscribers.indexOf(streamManager, 0);
      if (index > -1) {
          this.subscribers.splice(index, 1);
      }
  }

  async presentSettingsAlert() {
      const alert = await this.alertController.create({
          header: 'OpenVidu Server config',
          inputs: [
              {
                  name: 'url',
                  type: 'text',
                  value: 'https://demos.openvidu.io:4443/',
                  placeholder: 'URL',
                 
              },
              {
                  name: 'secret',
                  type: 'text',
                  value: 'MY_SECRET',
                  placeholder: 'Secret'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary'
              }, {
                  text: 'Ok',
                  handler: data => {
                      this.OPENVIDU_SERVER_URL = data.url;
                      this.OPENVIDU_SERVER_SECRET = data.secret;
                      
                  }
              }
          ]
      });

      await alert.present();
  }

 
  getToken(): Promise<string> {
      if (this.platform.is('ios') && this.platform.is('cordova') && this.OPENVIDU_SERVER_URL === 'https://localhost:4443') {
          // To make easier first steps with iOS apps, use demos OpenVidu Sever if no custom valid server is configured
          this.OPENVIDU_SERVER_URL = 'https://demos.openvidu.io:4443';
      }
      return this.createSession(this.mySessionId).then((sessionId) => {
          this.mySessionId2 = sessionId;
          return this.createToken(sessionId);
      });
  }

  createSession(sessionId) {
      return new Promise((resolve, reject) => {
          const body = JSON.stringify({ customSessionId: sessionId ,"recordingMode": "MANUAL","recording":true,"defaultOutputMode":"COMPOSED","defaultRecordingLayout":"BEST_FIT"});
          const options = {
              headers: new HttpHeaders({
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              }),
          };
          return this.httpClient
              .post(this.OPENVIDU_SERVER_URL + '/api/sessions', body, options)
              .pipe(
                  catchError((error) => {
                      if (error.status === 409) {
                          resolve(sessionId);
                      } else {
                          console.warn(
                              'No connection to OpenVidu Server. This may be a certificate error at ' +
                              this.OPENVIDU_SERVER_URL,
                          );
                          if (
                              window.confirm(
                                  'No connection to OpenVidu Server. This may be a certificate error at "' +
                                  this.OPENVIDU_SERVER_URL +
                                  // tslint:disable-next-line:max-line-length
                                  '"\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server' +
                                  'is up and running at "' +
                                  this.OPENVIDU_SERVER_URL +
                                  '"',
                              )
                          ) {
                              location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                          }
                      }
                      return observableThrowError(error);
                  }),
              )
              .subscribe((response) => {
                  console.log(response);
                  resolve(response['id']);
              });
      });
  }

  createToken(sessionId): Promise<string> {
      return new Promise((resolve, reject) => {
          const body = JSON.stringify({ session: sessionId });
          const options = {
              headers: new HttpHeaders({
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              }),
          };
          return this.httpClient
              .post(this.OPENVIDU_SERVER_URL + '/api/tokens', body, options)
              .pipe(
                  catchError((error) => {
                      reject(error);
                      return observableThrowError(error);
                  }),
              )
              .subscribe((response) => {
                  console.log(response);
                  resolve(response['token']);
              });
      });
  }


  recordStart() {
    
      return new Promise((resolve, reject) => {
          const body = JSON.stringify({ session: this.mySessionId2,"recording": true,"outputMode": "INDIVIDUAL", "recordingLayout": "CUSTOM"});
          console.log('body',body);
          const options = {
              headers: new HttpHeaders({
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              }),
          };
          return this.httpClient
              .post(this.OPENVIDU_SERVER_URL+'/api/recordings/start', body, options)
              .pipe(
                  catchError((error) => {
                      reject(error);
                      return observableThrowError(error);
                  }),
              )
              .subscribe((response) => {
                  console.log('response',response);
                  this.record_details = response;
                  this.recording_id = this.record_details.id;
                  if(this.running) return;
                  if (this.timeBegan === null) {
                     // this.reset();
                      this.timeBegan = new Date();
                  }
                  if (this.timeStopped !== null) {
                    let newStoppedDuration:any = (+new Date() - this.timeStopped)
                    this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
                  }
                  this.started = setInterval(this.clockRunning.bind(this), 10);
                    this.running = true;
                    console.log('this.recordingid',this.recording_id);
          
                  resolve(response['token']);
              });
        
      });
  }

  
  leaveSession(sessionId) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ customSessionId: sessionId });
        console.log('body',body);
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            }),
        };
        return this.httpClient
        .post(this.OPENVIDU_SERVER_URL + '/api/recordings/stop/'+this.recording_id, body, options)
        .pipe(
            catchError((error) => {
                reject(error);
                return observableThrowError(error);
            }),
        )
        .subscribe((response) => {
            console.log('response',response);
            this.running = false;
            this.timeStopped = new Date();
            clearInterval(this.started); 
            resolve(response['token']);
            if (this.session) {
                this.session.disconnect();
            }
        
            // Empty all properties...
            this.subscribers = [];
            delete this.publisher;
            delete this.session;
            delete this.OV;
            this.generateParticipantInfo();
         this.router.navigate(['/question']);


        });
  
});

   
}
  getRecord(sessionId) {
      return new Promise((resolve, reject) => {
        
          const options = {
              headers: new HttpHeaders({
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              }),
          };
          return this.httpClient
              .get(this.OPENVIDU_SERVER_URL + '/api/recordings',options)
              .pipe(
                  catchError((error) => {
                      reject(error);
                      return observableThrowError(error);
                  }),
              )
              .subscribe((response) => {
                  console.log('response',response);
                  resolve(response['token']);
              });
        
      });
  }

  zeroPrefix(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  clockRunning(){
      let currentTime:any = new Date()
      let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      let hour = timeElapsed.getUTCHours()
      let min = timeElapsed.getUTCMinutes()
      let sec = timeElapsed.getUTCSeconds()
      //let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) 
      //this.zeroPrefix(ms, 3);
    };

}

