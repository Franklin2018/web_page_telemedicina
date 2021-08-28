import { not } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
const host_url = environment.host_url;



@Injectable({
  providedIn: 'root'
})
export class NotificationService {



  // messageEmitter = new BehaviorSubject(null);
  public messageEmitter: EventEmitter<any> = new EventEmitter<any>();
  private tokenFCM;
  public shouldEmit : boolean = true;


  constructor(
    private http: HttpClient,
    private angularFireMessaging: AngularFireMessaging,
    ) {

    this.angularFireMessaging.messages.subscribe(
    (_messaging:AngularFireMessaging) => {
    _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }

  // Notification push

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) =>{
        this.cargarTokenFCM(token);
        console.log(token);
      },
    (err) => {
      console.error('Unable to get permission to notify.', err);
    });
    }



  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      this.messageEmitter.emit(payload);

      this.showCustomNotification(payload);
    })
  }

  showCustomNotification(payload:any){
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let options = {
      body: notify_data['body'],
      icon: "./assets/images/icon/zip.png",
      badge: "./assets/images/favicon.png",
      image: "./assets/images/users/d3.jpg",
    };
    // console.log("new message received. ", notify_data);
    let notify: Notification = new Notification(title, options);

    notify.onclick = (event:Event) =>{
      event.preventDefault();
      window.location.href = `${host_url}/dashboard/fichamedicas`;
    }
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  guardarTokenFCM( ) {
    const data={ 'tokenFCM' : this.tokenFCM};

    const url = `${base_url}/notificacion/tokenfcm`;
    return this.http.post( url, data, this.headers )
    .pipe(map((resp:{ok:boolean})=>resp.ok));
  }

  borrarTokenFCM() {
    const data={ 'tokenFCM':this.tokenFCM};

    const url = `${ base_url }/notificacion/eliminar`;
    return this.http.post( url, data, this.headers )
    .pipe(map((resp:{ok:boolean})=>resp.ok));
  }
  cargarTokenFCM(token:string) {
    //TODO  get tokenFCM from localstorage
      // if(this.tokenFCM != token){
        if(this.tokenFCM != null){
          this.borrarTokenFCM().subscribe(data=>{
          });
        }
        this.tokenFCM = token;
          this.guardarTokenFCM().subscribe(data=>{
          });

      // }
    }
}
