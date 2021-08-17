import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterMedicoComponent} from './register_medico/register_medico.component';


import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RegisterSelectionComponent } from './register-selection/register-selection.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterMedicoComponent,
    RegisterSelectionComponent,
    RegisterAdminComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RegisterMedicoComponent,
    RegisterSelectionComponent,



  ],
  imports: [
    MatStepperModule,
    MatSliderModule,
    MatTabsModule,
    BrowserAnimationsModule,
    CdkStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    NgxDropzoneModule,

    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // providers: [
  //   { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  // ]
})
export class AuthModule { }
