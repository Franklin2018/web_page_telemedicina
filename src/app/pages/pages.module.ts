import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { FichaMedicasComponent } from './mantenimientos/fichamedica/ficha-medicas.component';
import { CitaMedicasComponent } from './mantenimientos/cita-medicas/cita-medicas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    PerfilComponent,
    UsuariosComponent,
    UsuarioComponent,
    FichaMedicasComponent,
    BusquedaComponent,

    CitaMedicasComponent,


    JitsiComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class PagesModule { }
