import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { NotificationService } from './services/notificacion-services/notification.service';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    // push notification
    AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireMessagingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    // end push notification

    //notification
    ToastrModule.forRoot(),



  ],
    // push notification

  providers: [NotificationService,AsyncPipe],
    // end push notification

  bootstrap: [AppComponent]
})
export class AppModule { }
