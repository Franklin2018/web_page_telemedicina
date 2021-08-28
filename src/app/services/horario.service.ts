import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';
import { query } from '@angular/animations';
import { Persona } from '../models/persona.model';
import { Medico } from '../models/medico.model';
import { NotificationService } from './notificacion-services/notification.service';
import { Horario } from '../models/horario.model';

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  // public auth2: any;
  public horario: Horario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) {
    // this.googleInit();
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  actualizarHorario( data: { dias: string, horaInicio: string, horaCierre: string, tiempo:string }, medico:string ) {

    data = {
      ...data,
    }

    return this.http.put(`${ base_url }/horarios/${medico}`, data, this.headers );

  }

  cargarHorario(id:String){
    const url = `${base_url}/horarios/horario/${id}`;
    return this.http.get(url,this.headers).pipe(
      map((horario:Horario)=>horario)
    )
  }







}
