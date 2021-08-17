import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterMedicoComponent } from './register_medico/register_medico.component';
import { RegisterSelectionComponent } from './register-selection/register-selection.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [

    { path: 'register', component: RegisterComponent },
    { path: 'register_selection', component: RegisterSelectionComponent },
    { path: 'register_medico', component: RegisterMedicoComponent },
    { path: 'register_admin', component: RegisterAdminComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
