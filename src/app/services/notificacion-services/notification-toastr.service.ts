import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class NotificationToastrService {


  constructor(
    private toastr: ToastrService,
    ) {}


  //Notification ToastTR

showSuccess(message, title){
      this.toastr.success(message, title)
  }

  showError(message, title){
      this.toastr.error(message, title)
  }

  showInfo(message, title){
      this.toastr.info(message, title)
  }

  showWarning(message, title){
      this.toastr.warning(message, title)
  }

  // Notification push



}
