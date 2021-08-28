import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';

import { FichaMedica } from '../models/ficha-medica.model';
import { CargarFichaMedica } from '../interfaces/cargar-fichamedicas.interface';
import { ConsultaResponse } from '../interfaces/consulta-response';

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {


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








  cargarConsulta(  fichamedica: String) {

    const url = `${ base_url }/consulta/consulta/${fichamedica}`;
    return this.http.get<ConsultaResponse>( url, this.headers )
            .pipe(
              map( (resp) => {
                const consulta = resp;
                return consulta;
              })
            )
          }

  habilitarSala( fichaMedica: String ) {
    return this.http.put(`${ base_url }/consulta/updatesala/${ fichaMedica }`, this.headers );
  }

  finalizarSala( fichaMedica: String ) {
    return this.http.put(`${ base_url }/consulta/finalizar/${ fichaMedica }`, this.headers );
  }

  guardarFichaMedica( fichaMedica: FichaMedica ) {

    return this.http.put(`${ base_url }/fichaMedica/${ fichaMedica._id }`, fichaMedica, this.headers );

  }


  rechazarFichaMedica( fichaMedica: FichaMedica ) {

    return this.http.put(`${ base_url }/fichamedica/rechazar/${ fichaMedica._id }`, fichaMedica, this.headers );

  }
  aceptarFichaMedica( fichaMedica: FichaMedica ) {

    return this.http.put(`${ base_url }/fichaMedica/aceptar/${ fichaMedica._id }`, fichaMedica, this.headers );

  }

  generarQuery(names:any,values:any){
    var query = '';
    for (let i = 0; i < values.length; i++) {
      if (values[i] != "todos") {
        query +=`&${names[i]}=${values[i]}`;
      }
    }
    return query
  }

}
