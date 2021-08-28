import { Component } from '@angular/core';
import { HandleNotificationService } from './services/handle-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  constructor(
    // private handleNotificationService: HandleNotificationService,
  ) { }
  ngOnInit() {
    // this.handleNotificationService.ngOnInit();

    // this.notificationService.requestPermission();
    // this.notificationService.receiveMessage();
    // this.message = this.notificationService.currentMessage;
  }
}
