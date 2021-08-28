import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
// import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
// import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
// import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { FichaMedicasComponent } from './mantenimientos/fichamedica/ficha-medicas.component';
import { CitaMedicasComponent } from './mantenimientos/cita-medicas/cita-medicas.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'jitsi/:id', component: JitsiComponent, data: { titulo: 'jitsi' }},

  // Medico
  { path: 'fichamedicas', component: FichaMedicasComponent, data: { titulo: 'Matenimiento de Ficha medicas' }},
  { path: 'citamedicas', component: CitaMedicasComponent, data: { titulo: 'Cita Medicas' }},
  { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Perfil publico de usuario' }},
  { path: 'citamedicas', component: FichaMedicasComponent, data: { titulo: 'Citas Medicas' }},

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
