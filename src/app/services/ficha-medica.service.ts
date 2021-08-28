import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';

import { FichaMedica } from '../models/ficha-medica.model';
import { CargarFichaMedica } from '../interfaces/cargar-fichamedicas.interface';

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {


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





  cargarFichaMedicas( desde: number = 0, entrada:number = 10,  estado : string , sort: number= 1) {
    const query = this.generarQuery(['estado'],[estado]);

    const url = `${ base_url }/fichamedica/medico?desde=${ desde }&entrada=${ entrada }${ query }&sort=${ sort }`;
    return this.http.get<CargarFichaMedica>( url, this.headers )
            .pipe(
              map( resp => {
                const fichaMedicas = resp.fichaMedicas.map(
                  ficha => new FichaMedica(
                    ficha.nroFicha,
                    ficha.fecha,
                    ficha.horaInicio,
                    ficha.horaCierre,
                    ficha.estado,
                    ficha.medico,
                    ficha.paciente,
                    ficha.consulta,
                    ficha._id,)
                );
                return {
                  total: resp.total,
                  fichaMedicas
                };
              })
            )
          }

  guardarFichaMedica( fichaMedica: FichaMedica ) {

    return this.http.put(`${ base_url }/fichaMedica/${ fichaMedica._id }`, fichaMedica, this.headers );

  }
  rechazarFichaMedica( fichaMedica: FichaMedica ) {
console.log('fichaMedica._id');
console.log(fichaMedica._id);
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
