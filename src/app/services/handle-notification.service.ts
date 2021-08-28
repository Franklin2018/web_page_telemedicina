import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { NotificationService } from './notificacion-services/notification.service';
import { NotificationToastrService } from './notificacion-services/notification-toastr.service';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HandleNotificationService  {


  constructor(
    private notificationService: NotificationService,
    private notificationToastrService: NotificationToastrService,
    ) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.notificationService.requestPermission();
    this.notificationService.receiveMessage();

    this.notificationService.messageEmitter.pipe(delay(100))
    .subscribe( payload => {
      let notify_data = payload['notification'];
      let title = notify_data['title']
      let body= notify_data['body']

      console.log('mensajito ');


      this.notificationToastrService.showInfo(title,body);

    } );

    // this.notificationService.currentMessage.pipe(delay(100)).subscribe( payload => {
    //   let notify_data = payload['notification'];
    //   let title = notify_data['title']
    //   let body= notify_data['body']
    //   this.notificationToastrService.showInfo(title,body);
    // } )
  };
  //Notification ToastTR
}
